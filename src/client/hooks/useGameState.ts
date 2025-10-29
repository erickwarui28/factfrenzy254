import { useCallback, useEffect, useState } from 'react';
import type { 
  InitResponse, 
  StartGameResponse, 
  SubmitAnswerResponse, 
  NextQuestionResponse, 
  LeaderboardResponse, 
  SaveScoreResponse,
  Question,
  GameState,
  LeaderboardEntry
} from '../../shared/types/api';

interface GameHookState {
  // Game state
  gameState: 'loading' | 'welcome' | 'question' | 'reveal' | 'results';
  username: string | null;
  postId: string | null;
  gameReady: boolean;
  loading: boolean;
  
  // Current game data
  currentQuestion: Question | null;
  currentRound: number;
  totalRounds: number;
  score: number;
  selectedAnswer: number | null;
  timeRemaining: number;
  
  // Answer reveal data
  isCorrect: boolean | null;
  pointsEarned: number;
  explanation: string;
  correctAnswer: number | null;
  
  // Results data
  finalScore: number;
  rank: number | null;
  leaderboard: LeaderboardEntry[];
  
  // Error state
  error: string | null;
}

export const useGameState = () => {
  const [state, setState] = useState<GameHookState>({
    gameState: 'loading',
    username: null,
    postId: null,
    gameReady: false,
    loading: true,
    currentQuestion: null,
    currentRound: 0,
    totalRounds: 5,
    score: 0,
    selectedAnswer: null,
    timeRemaining: 20,
    isCorrect: null,
    pointsEarned: 0,
    explanation: '',
    correctAnswer: null,
    finalScore: 0,
    rank: null,
    leaderboard: [],
    error: null,
  });

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Initialize game
  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch('/api/init');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: InitResponse = await res.json();
        if (data.type !== 'init') throw new Error('Unexpected response');
        
        setState(prev => ({
          ...prev,
          username: data.username,
          postId: data.postId,
          gameReady: data.gameReady,
          loading: false,
          gameState: 'welcome',
        }));
      } catch (err) {
        console.error('Failed to init game', err);
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to initialize game',
        }));
      }
    };
    void init();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (state.gameState === 'question' && state.timeRemaining > 0) {
      const interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 0.1),
        }));
      }, 100);
      setTimerInterval(interval);
      
      return () => clearInterval(interval);
    } else if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [state.gameState, state.timeRemaining]);

  // Auto-submit when timer runs out
  useEffect(() => {
    if (state.gameState === 'question' && state.timeRemaining <= 0 && state.selectedAnswer === null) {
      submitAnswer(-1); // Submit no answer
    }
  }, [state.timeRemaining, state.gameState, state.selectedAnswer]);

  const startGame = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const res = await fetch('/api/start-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: StartGameResponse = await res.json();
      if (data.type !== 'start-game') throw new Error('Unexpected response');
      
      setState(prev => ({
        ...prev,
        gameState: 'question',
        currentQuestion: data.question,
        currentRound: data.roundNumber,
        score: 0,
        selectedAnswer: null,
        timeRemaining: 20,
        loading: false,
      }));
    } catch (err) {
      console.error('Failed to start game', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to start game',
      }));
    }
  }, []);

  const submitAnswer = useCallback(async (answerIndex: number) => {
    if (!state.currentQuestion || state.selectedAnswer !== null) return;
    
    try {
      setState(prev => ({ ...prev, selectedAnswer: answerIndex, loading: true }));
      
      const res = await fetch('/api/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedAnswer: answerIndex,
          questionId: state.currentQuestion.id,
        }),
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: SubmitAnswerResponse = await res.json();
      if (data.type !== 'submit-answer') throw new Error('Unexpected response');
      
      setState(prev => ({
        ...prev,
        gameState: 'reveal',
        isCorrect: data.isCorrect,
        pointsEarned: data.pointsEarned,
        explanation: data.explanation,
        correctAnswer: data.correctAnswer,
        score: prev.score + data.pointsEarned,
        loading: false,
      }));
      
      // Auto-advance after 3 seconds
      setTimeout(() => {
        nextQuestion();
      }, 3000);
    } catch (err) {
      console.error('Failed to submit answer', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to submit answer',
      }));
    }
  }, [state.currentQuestion, state.selectedAnswer]);

  const nextQuestion = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const res = await fetch('/api/next-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: NextQuestionResponse = await res.json();
      if (data.type !== 'next-question') throw new Error('Unexpected response');
      
      if (data.gameComplete) {
        // Game finished, get results
        const saveRes = await fetch('/api/save-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
        
        if (!saveRes.ok) throw new Error(`HTTP ${saveRes.status}`);
        const saveData: SaveScoreResponse = await saveRes.json();
        if (saveData.type !== 'save-score') throw new Error('Unexpected response');
        
        setState(prev => ({
          ...prev,
          gameState: 'results',
          finalScore: saveData.finalScore,
          rank: saveData.rank,
          leaderboard: saveData.leaderboard,
          loading: false,
        }));
      } else {
        // Next question
        setState(prev => ({
          ...prev,
          gameState: 'question',
          currentQuestion: data.question,
          currentRound: data.roundNumber,
          selectedAnswer: null,
          timeRemaining: 20,
          isCorrect: null,
          pointsEarned: 0,
          explanation: '',
          correctAnswer: null,
          loading: false,
        }));
      }
    } catch (err) {
      console.error('Failed to get next question', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to get next question',
      }));
    }
  }, []);

  const playAgain = useCallback(() => {
    setState(prev => ({
      ...prev,
      gameState: 'welcome',
      currentQuestion: null,
      currentRound: 0,
      score: 0,
      selectedAnswer: null,
      timeRemaining: 20,
      isCorrect: null,
      pointsEarned: 0,
      explanation: '',
      correctAnswer: null,
      finalScore: 0,
      rank: null,
      leaderboard: [],
      error: null,
    }));
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (state.selectedAnswer === null && state.gameState === 'question') {
      submitAnswer(answerIndex);
    }
  }, [state.selectedAnswer, state.gameState, submitAnswer]);

  return {
    ...state,
    startGame,
    selectAnswer,
    nextQuestion,
    playAgain,
  } as const;
};
