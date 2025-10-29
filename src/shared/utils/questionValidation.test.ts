import { describe, it, expect } from 'vitest';
import type { Question } from '../types/api';
import {
  validateQuestion,
  validateQuestionDatabase,
  getCategoryDistribution,
  getDifficultyDistribution,
  checkIdUniqueness,
  validateAnswerIndices
} from './questionValidation';

describe('Question Validation', () => {
  const validQuestion: Question = {
    id: 'q1',
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    correctAnswer: 1,
    explanation: 'Paris is the capital and largest city of France.',
    category: 'Geography',
    difficulty: 'easy'
  };

  describe('validateQuestion', () => {
    it('should validate a correct question', () => {
      const result = validateQuestion(validQuestion);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.questionId).toBe('q1');
    });

    it('should reject question with missing ID', () => {
      const invalidQuestion = { ...validQuestion, id: '' };
      const result = validateQuestion(invalidQuestion);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Question ID is required and must be a non-empty string');
    });

    it('should reject question with wrong number of options', () => {
      const invalidQuestion = { ...validQuestion, options: ['A', 'B'] };
      const result = validateQuestion(invalidQuestion);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Question must have exactly 4 options');
    });

    it('should reject question with invalid correct answer index', () => {
      const invalidQuestion = { ...validQuestion, correctAnswer: 5 };
      const result = validateQuestion(invalidQuestion);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Correct answer index must be between 0 and 3');
    });

    it('should reject question with invalid difficulty', () => {
      const invalidQuestion = { ...validQuestion, difficulty: 'impossible' as any };
      const result = validateQuestion(invalidQuestion);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Difficulty must be one of: easy, medium, hard');
    });

    it('should reject question with duplicate options', () => {
      const invalidQuestion = { ...validQuestion, options: ['Paris', 'Paris', 'Berlin', 'Madrid'] };
      const result = validateQuestion(invalidQuestion);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('All options must be unique');
    });
  });

  describe('validateQuestionDatabase', () => {
    it('should validate a database with valid questions', () => {
      const questions = [validQuestion];
      const result = validateQuestionDatabase(questions);
      expect(result.isValid).toBe(true);
      expect(result.totalQuestions).toBe(1);
      expect(result.validQuestions).toBe(1);
      expect(result.invalidQuestions).toBe(0);
      expect(result.duplicateIds).toHaveLength(0);
    });

    it('should detect duplicate IDs', () => {
      const duplicateQuestion = { ...validQuestion, question: 'Different question' };
      const questions = [validQuestion, duplicateQuestion];
      const result = validateQuestionDatabase(questions);
      expect(result.isValid).toBe(false);
      expect(result.duplicateIds).toContain('q1');
    });
  });

  describe('getCategoryDistribution', () => {
    it('should count categories correctly', () => {
      const questions: Question[] = [
        { ...validQuestion, category: 'Geography' },
        { ...validQuestion, id: 'q2', category: 'Science' },
        { ...validQuestion, id: 'q3', category: 'Geography' }
      ];
      const distribution = getCategoryDistribution(questions);
      expect(distribution.Geography).toBe(2);
      expect(distribution.Science).toBe(1);
    });
  });

  describe('getDifficultyDistribution', () => {
    it('should count difficulties correctly', () => {
      const questions: Question[] = [
        { ...validQuestion, difficulty: 'easy' },
        { ...validQuestion, id: 'q2', difficulty: 'medium' },
        { ...validQuestion, id: 'q3', difficulty: 'easy' },
        { ...validQuestion, id: 'q4', difficulty: 'hard' }
      ];
      const distribution = getDifficultyDistribution(questions);
      expect(distribution.easy).toBe(2);
      expect(distribution.medium).toBe(1);
      expect(distribution.hard).toBe(1);
    });
  });

  describe('checkIdUniqueness', () => {
    it('should detect unique IDs', () => {
      const questions = [
        { ...validQuestion, id: 'q1' },
        { ...validQuestion, id: 'q2' }
      ];
      const result = checkIdUniqueness(questions);
      expect(result.isUnique).toBe(true);
      expect(result.duplicates).toHaveLength(0);
    });

    it('should detect duplicate IDs', () => {
      const questions = [
        { ...validQuestion, id: 'q1' },
        { ...validQuestion, id: 'q1' }
      ];
      const result = checkIdUniqueness(questions);
      expect(result.isUnique).toBe(false);
      expect(result.duplicates).toContain('q1');
    });
  });

  describe('validateAnswerIndices', () => {
    it('should validate correct answer indices', () => {
      const questions = [
        { ...validQuestion, correctAnswer: 0 },
        { ...validQuestion, id: 'q2', correctAnswer: 3 }
      ];
      const result = validateAnswerIndices(questions);
      expect(result.isValid).toBe(true);
      expect(result.invalidQuestions).toHaveLength(0);
    });

    it('should detect invalid answer indices', () => {
      const questions = [
        { ...validQuestion, correctAnswer: 5 },
        { ...validQuestion, id: 'q2', correctAnswer: -1 }
      ];
      const result = validateAnswerIndices(questions);
      expect(result.isValid).toBe(false);
      expect(result.invalidQuestions).toContain('q1');
      expect(result.invalidQuestions).toContain('q2');
    });
  });
});