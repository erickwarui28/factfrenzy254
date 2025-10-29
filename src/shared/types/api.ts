// Game Types
export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-3 index
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type GameState = {
  currentRound: number;
  score: number;
  answers: AnswerResult[];
  startTime: number;
  username: string;
  gameId: string;
};

export type AnswerResult = {
  questionId: string;
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  pointsEarned: number;
  timeElapsed: number;
};

export type LeaderboardEntry = {
  username: string;
  score: number;
  completedAt: number;
  rank: number;
};

export type GameSession = {
  gameId: string;
  username: string;
  currentRound: number;
  score: number;
  answers: AnswerResult[];
  roundStartTime: number;
  isActive: boolean;
};

// API Response Types
export type InitResponse = {
  type: 'init';
  postId: string;
  username: string;
  gameReady: boolean;
};

export type StartGameResponse = {
  type: 'start-game';
  gameId: string;
  question: Question;
  roundNumber: number;
  roundStartTime: number;
};

export type SubmitAnswerResponse = {
  type: 'submit-answer';
  isCorrect: boolean;
  pointsEarned: number;
  correctAnswer: number;
  explanation: string;
  timeElapsed: number;
};

export type NextQuestionResponse = {
  type: 'next-question';
  question: Question | null;
  roundNumber: number;
  roundStartTime: number;
  gameComplete: boolean;
};

export type LeaderboardResponse = {
  type: 'leaderboard';
  leaderboard: LeaderboardEntry[];
  userRank: number | null;
};

export type SaveScoreResponse = {
  type: 'save-score';
  finalScore: number;
  rank: number;
  leaderboard: LeaderboardEntry[];
};
