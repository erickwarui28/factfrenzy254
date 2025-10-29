import express from 'express';
import { 
  InitResponse, 
  StartGameResponse, 
  SubmitAnswerResponse, 
  NextQuestionResponse, 
  LeaderboardResponse, 
  SaveScoreResponse,
  Question,
  GameSession,
  LeaderboardEntry
} from '../shared/types/api';
import { redis, reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';
import { getRandomQuestions } from './data/questions';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

// Helper functions
const initializeQuestions = async (postId: string): Promise<void> => {
  // No longer need to store questions in Redis since we use random selection per session
  // This function is kept for compatibility but does nothing
};

const getQuestions = async (postId: string): Promise<Question[]> => {
  // Return random questions for each session instead of stored questions
  return getRandomQuestions();
};

const calculatePoints = (timeElapsed: number, isCorrect: boolean, selectedAnswer: number): number => {
  // No answer selected (selectedAnswer === -1)
  if (selectedAnswer === -1) return 0;
  
  // Wrong answer selected
  if (!isCorrect) return 1;
  
  // Correct answer - points based on speed
  if (timeElapsed <= 10) return 100; // Full points for quick answers
  if (timeElapsed <= 20) return 50;  // Half points for slower answers
  return 0; // No points for late answers
};

// API Routes
router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (_req, res): Promise<void> => {
    const { postId } = context;

    if (!postId) {
      console.error('API Init Error: postId not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postId is required but missing from context',
      });
      return;
    }

    try {
      await initializeQuestions(postId);
      const username = await reddit.getCurrentUsername();

      res.json({
        type: 'init',
        postId: postId,
        username: username ?? 'anonymous',
        gameReady: true,
      });
    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      let errorMessage = 'Unknown error during initialization';
      if (error instanceof Error) {
        errorMessage = `Initialization failed: ${error.message}`;
      }
      res.status(400).json({ status: 'error', message: errorMessage });
    }
  }
);

router.post<{ postId: string }, StartGameResponse | { status: string; message: string }, unknown>(
  '/api/start-game',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      const username = await reddit.getCurrentUsername();
      const gameId = `${postId}:${username}:${Date.now()}`;
      const questions = await getQuestions(postId);
      
      if (questions.length === 0) {
        res.status(400).json({
          status: 'error',
          message: 'No questions available',
        });
        return;
      }

      // Initialize game session with random questions
      const session: GameSession = {
        gameId,
        username: username ?? 'anonymous',
        currentRound: 1,
        score: 0,
        answers: [],
        roundStartTime: Date.now(),
        isActive: true,
      };

      // Store session with questions for this game
      const sessionData = {
        ...session,
        questions: questions, // Store the random questions for this session
      };

      await redis.set(`post:${postId}:session:${username}`, JSON.stringify(sessionData));

      // Return first question without correct answer
      const firstQuestion = { ...questions[0] };
      delete (firstQuestion as any).correctAnswer; // Remove correct answer from response

      res.json({
        type: 'start-game',
        gameId,
        question: firstQuestion,
        roundNumber: 1,
        roundStartTime: session.roundStartTime,
      });
    } catch (error) {
      console.error(`Start game error:`, error);
      res.status(400).json({
        status: 'error',
        message: 'Failed to start game',
      });
    }
  }
);

router.post<{ postId: string }, SubmitAnswerResponse | { status: string; message: string }, { selectedAnswer: number; questionId: string }>(
  '/api/submit-answer',
  async (req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      const username = await reddit.getCurrentUsername();
      const { selectedAnswer, questionId } = req.body;
      
      if (typeof selectedAnswer !== 'number' || typeof questionId !== 'string') {
        res.status(400).json({
          status: 'error',
          message: 'Invalid request data',
        });
        return;
      }

      // Get game session
      const sessionData = await redis.get(`post:${postId}:session:${username}`);
      if (!sessionData) {
        res.status(400).json({
          status: 'error',
          message: 'No active game session',
        });
        return;
      }

      const sessionWithQuestions = JSON.parse(sessionData);
      const session: GameSession = {
        gameId: sessionWithQuestions.gameId,
        username: sessionWithQuestions.username,
        currentRound: sessionWithQuestions.currentRound,
        score: sessionWithQuestions.score,
        answers: sessionWithQuestions.answers,
        roundStartTime: sessionWithQuestions.roundStartTime,
        isActive: sessionWithQuestions.isActive,
      };
      
      const currentTime = Date.now();
      const timeElapsed = (currentTime - session.roundStartTime) / 1000; // Convert to seconds

      // Get question details from stored session questions
      const questions = sessionWithQuestions.questions;
      const question = questions.find((q: Question) => q.id === questionId);
      
      if (!question) {
        res.status(400).json({
          status: 'error',
          message: 'Question not found',
        });
        return;
      }

      const isCorrect = selectedAnswer === question.correctAnswer;
      const pointsEarned = calculatePoints(timeElapsed, isCorrect, selectedAnswer);

      // Update session
      session.answers.push({
        questionId,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        pointsEarned,
        timeElapsed,
      });
      session.score += pointsEarned;

      // Save updated session with questions preserved
      const updatedSessionData = {
        ...session,
        questions: sessionWithQuestions.questions,
      };

      await redis.set(`post:${postId}:session:${username}`, JSON.stringify(updatedSessionData));

      res.json({
        type: 'submit-answer',
        isCorrect,
        pointsEarned,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        timeElapsed,
      });
    } catch (error) {
      console.error(`Submit answer error:`, error);
      res.status(400).json({
        status: 'error',
        message: 'Failed to submit answer',
      });
    }
  }
);

router.post<{ postId: string }, NextQuestionResponse | { status: string; message: string }, unknown>(
  '/api/next-question',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      const username = await reddit.getCurrentUsername();
      const sessionData = await redis.get(`post:${postId}:session:${username}`);
      
      if (!sessionData) {
        res.status(400).json({
          status: 'error',
          message: 'No active game session',
        });
        return;
      }

      const sessionWithQuestions = JSON.parse(sessionData);
      const session: GameSession = {
        gameId: sessionWithQuestions.gameId,
        username: sessionWithQuestions.username,
        currentRound: sessionWithQuestions.currentRound,
        score: sessionWithQuestions.score,
        answers: sessionWithQuestions.answers,
        roundStartTime: sessionWithQuestions.roundStartTime,
        isActive: sessionWithQuestions.isActive,
      };
      
      const questions = sessionWithQuestions.questions;
      
      session.currentRound++;
      session.roundStartTime = Date.now();

      if (session.currentRound > questions.length) {
        // Game complete
        session.isActive = false;
        const updatedSessionData = {
          ...session,
          questions: sessionWithQuestions.questions,
        };
        await redis.set(`post:${postId}:session:${username}`, JSON.stringify(updatedSessionData));
        
        res.json({
          type: 'next-question',
          question: null,
          roundNumber: session.currentRound,
          roundStartTime: session.roundStartTime,
          gameComplete: true,
        });
      } else {
        // Next question
        const nextQuestion = { ...questions[session.currentRound - 1] };
        delete (nextQuestion as any).correctAnswer; // Remove correct answer from response
        
        const updatedSessionData = {
          ...session,
          questions: sessionWithQuestions.questions,
        };
        await redis.set(`post:${postId}:session:${username}`, JSON.stringify(updatedSessionData));

        res.json({
          type: 'next-question',
          question: nextQuestion,
          roundNumber: session.currentRound,
          roundStartTime: session.roundStartTime,
          gameComplete: false,
        });
      }
    } catch (error) {
      console.error(`Next question error:`, error);
      res.status(400).json({
        status: 'error',
        message: 'Failed to get next question',
      });
    }
  }
);

router.post<{ postId: string }, LeaderboardResponse | { status: string; message: string }, unknown>(
  '/api/get-leaderboard',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      const leaderboardKey = `post:${postId}:leaderboard`;
      const leaderboardData = await redis.get(leaderboardKey);
      
      let leaderboard: LeaderboardEntry[] = [];
      if (leaderboardData) {
        const scores = JSON.parse(leaderboardData);
        leaderboard = scores
          .sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score)
          .slice(0, 10)
          .map((entry: LeaderboardEntry, index: number) => ({
            ...entry,
            rank: index + 1,
          }));
      }

      res.json({
        type: 'leaderboard',
        leaderboard,
        userRank: null, // We'll implement user rank lookup later
      });
    } catch (error) {
      console.error(`Get leaderboard error:`, error);
      res.status(400).json({
        status: 'error',
        message: 'Failed to get leaderboard',
      });
    }
  }
);

router.post<{ postId: string }, SaveScoreResponse | { status: string; message: string }, unknown>(
  '/api/save-score',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      const username = await reddit.getCurrentUsername();
      const sessionData = await redis.get(`post:${postId}:session:${username}`);
      
      if (!sessionData) {
        res.status(400).json({
          status: 'error',
          message: 'No game session to save',
        });
        return;
      }

      const sessionWithQuestions = JSON.parse(sessionData);
      const session: GameSession = {
        gameId: sessionWithQuestions.gameId,
        username: sessionWithQuestions.username,
        currentRound: sessionWithQuestions.currentRound,
        score: sessionWithQuestions.score,
        answers: sessionWithQuestions.answers,
        roundStartTime: sessionWithQuestions.roundStartTime,
        isActive: sessionWithQuestions.isActive,
      };
      
      // Get existing leaderboard
      const leaderboardKey = `post:${postId}:leaderboard`;
      const existingData = await redis.get(leaderboardKey);
      let leaderboard: LeaderboardEntry[] = existingData ? JSON.parse(existingData) : [];
      
      // Add or update user's score
      const existingUserIndex = leaderboard.findIndex(entry => entry.username === username);
      const newEntry: LeaderboardEntry = {
        username: username ?? 'anonymous',
        score: session.score,
        completedAt: Date.now(),
        rank: 0, // Will be calculated after sorting
      };
      
      if (existingUserIndex >= 0) {
        leaderboard[existingUserIndex] = newEntry;
      } else {
        leaderboard.push(newEntry);
      }
      
      // Sort by score (highest first) and assign ranks
      leaderboard.sort((a, b) => b.score - a.score);
      leaderboard = leaderboard.map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));
      
      // Save updated leaderboard
      await redis.set(leaderboardKey, JSON.stringify(leaderboard));
      
      // Find user's rank
      const userRank = leaderboard.find(entry => entry.username === username)?.rank || leaderboard.length;

      res.json({
        type: 'save-score',
        finalScore: session.score,
        rank: userRank,
        leaderboard: leaderboard.slice(0, 10), // Return top 10
      });
    } catch (error) {
      console.error(`Save score error:`, error);
      res.status(400).json({
        status: 'error',
        message: 'Failed to save score',
      });
    }
  }
);

router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
