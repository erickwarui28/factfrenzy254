import { describe, it, expect } from 'vitest';
import type { Question } from '../types/api';
import { validateQuestionDatabase } from './questionValidation';
import { 
  generateNextQuestionId, 
  createQuestion, 
  addQuestionToDatabase,
  validateQuestionBatch,
  getCategoryBalanceRecommendations,
  getDifficultyBalanceRecommendations
} from './questionHelpers';

describe('Question Validation Integration', () => {
  const sampleQuestions: Question[] = [
    {
      id: 'q1',
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctAnswer: 1,
      explanation: 'Paris is the capital of France.',
      category: 'Geography',
      difficulty: 'easy'
    },
    {
      id: 'q2',
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: 'Basic arithmetic: 2 + 2 = 4.',
      category: 'Math',
      difficulty: 'easy'
    }
  ];

  describe('Question ID Generation', () => {
    it('should generate the next sequential ID', () => {
      const nextId = generateNextQuestionId(sampleQuestions);
      expect(nextId).toBe('q3');
    });

    it('should handle empty question array', () => {
      const nextId = generateNextQuestionId([]);
      expect(nextId).toBe('q1');
    });
  });

  describe('Question Creation', () => {
    it('should create a valid question', () => {
      const result = createQuestion(
        'What is the largest planet?',
        ['Earth', 'Jupiter', 'Mars', 'Venus'],
        1,
        'Jupiter is the largest planet in our solar system.',
        'Science',
        'easy',
        sampleQuestions
      );

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.question.id).toBe('q3');
    });

    it('should detect invalid question creation', () => {
      const result = createQuestion(
        '', // Invalid empty question
        ['A', 'B', 'C', 'D'],
        1,
        'Explanation',
        'Category',
        'easy',
        sampleQuestions
      );

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Database Addition', () => {
    it('should successfully add a valid question', () => {
      const newQuestion: Question = {
        id: 'q3',
        question: 'What is the smallest planet?',
        options: ['Mercury', 'Venus', 'Earth', 'Mars'],
        correctAnswer: 0,
        explanation: 'Mercury is the smallest planet.',
        category: 'Science',
        difficulty: 'medium'
      };

      const result = addQuestionToDatabase(newQuestion, sampleQuestions);
      expect(result.success).toBe(true);
      expect(result.updatedQuestions).toHaveLength(3);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject duplicate ID', () => {
      const duplicateQuestion: Question = {
        id: 'q1', // Duplicate ID
        question: 'Different question',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Explanation',
        category: 'Category',
        difficulty: 'easy'
      };

      const result = addQuestionToDatabase(duplicateQuestion, sampleQuestions);
      expect(result.success).toBe(false);
      expect(result.errors).toContain("Question ID 'q1' already exists");
    });
  });

  describe('Batch Validation', () => {
    it('should validate a batch of questions', () => {
      const newQuestions: Question[] = [
        {
          id: 'q3',
          question: 'Question 3',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'Explanation 3',
          category: 'Science',
          difficulty: 'easy'
        },
        {
          id: 'q4',
          question: 'Question 4',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 1,
          explanation: 'Explanation 4',
          category: 'History',
          difficulty: 'medium'
        }
      ];

      const result = validateQuestionBatch(newQuestions, sampleQuestions);
      expect(result.isValid).toBe(true);
      expect(result.validQuestions).toHaveLength(2);
      expect(result.invalidQuestions).toHaveLength(0);
    });
  });

  describe('Balance Recommendations', () => {
    it('should provide category balance recommendations', () => {
      const recommendations = getCategoryBalanceRecommendations(sampleQuestions, 10);
      expect(recommendations).toHaveLength(2); // Geography and Math
      expect(recommendations.every(r => typeof r.needed === 'number')).toBe(true);
    });

    it('should provide difficulty balance recommendations', () => {
      const recommendations = getDifficultyBalanceRecommendations(sampleQuestions);
      expect(recommendations).toHaveLength(3); // easy, medium, hard
      expect(recommendations.find(r => r.difficulty === 'easy')?.current).toBe(2);
    });
  });

  describe('Full Integration', () => {
    it('should validate the entire workflow', () => {
      // Start with existing questions
      let currentQuestions = [...sampleQuestions];
      
      // Validate current database
      let validation = validateQuestionDatabase(currentQuestions);
      expect(validation.isValid).toBe(true);
      
      // Create a new question
      const newQuestionResult = createQuestion(
        'What is the speed of light?',
        ['299,792,458 m/s', '300,000,000 m/s', '150,000,000 m/s', '500,000,000 m/s'],
        0,
        'The speed of light in vacuum is exactly 299,792,458 meters per second.',
        'Physics',
        'hard',
        currentQuestions
      );
      
      expect(newQuestionResult.isValid).toBe(true);
      
      // Add it to the database
      const addResult = addQuestionToDatabase(newQuestionResult.question, currentQuestions);
      expect(addResult.success).toBe(true);
      
      currentQuestions = addResult.updatedQuestions;
      
      // Validate the updated database
      validation = validateQuestionDatabase(currentQuestions);
      expect(validation.isValid).toBe(true);
      expect(validation.totalQuestions).toBe(3);
    });
  });
});