import type { Question } from '../types/api';

/**
 * Validation result for a single question
 */
export interface QuestionValidationResult {
  isValid: boolean;
  errors: string[];
  questionId: string;
}

/**
 * Validation result for the entire question database
 */
export interface DatabaseValidationResult {
  isValid: boolean;
  totalQuestions: number;
  validQuestions: number;
  invalidQuestions: number;
  duplicateIds: string[];
  questionResults: QuestionValidationResult[];
  categoryDistribution: CategoryDistribution;
  difficultyDistribution: DifficultyDistribution;
}

/**
 * Category distribution statistics
 */
export interface CategoryDistribution {
  [category: string]: number;
}

/**
 * Difficulty distribution statistics
 */
export interface DifficultyDistribution {
  easy: number;
  medium: number;
  hard: number;
}

/**
 * Validates a single question for format compliance
 */
export function validateQuestion(question: Question): QuestionValidationResult {
  const errors: string[] = [];
  
  // Check ID format
  if (!question.id || typeof question.id !== 'string' || question.id.trim() === '') {
    errors.push('Question ID is required and must be a non-empty string');
  }
  
  // Check question text
  if (!question.question || typeof question.question !== 'string' || question.question.trim() === '') {
    errors.push('Question text is required and must be a non-empty string');
  }
  
  // Check options array
  if (!Array.isArray(question.options)) {
    errors.push('Options must be an array');
  } else {
    if (question.options.length !== 4) {
      errors.push('Question must have exactly 4 options');
    }
    
    // Check each option is a non-empty string
    question.options.forEach((option, index) => {
      if (!option || typeof option !== 'string' || option.trim() === '') {
        errors.push(`Option ${index + 1} must be a non-empty string`);
      }
    });
    
    // Check for duplicate options
    const uniqueOptions = new Set(question.options);
    if (uniqueOptions.size !== question.options.length) {
      errors.push('All options must be unique');
    }
  }
  
  // Check correct answer index
  if (typeof question.correctAnswer !== 'number') {
    errors.push('Correct answer must be a number');
  } else if (question.correctAnswer < 0 || question.correctAnswer > 3) {
    errors.push('Correct answer index must be between 0 and 3');
  }
  
  // Check explanation
  if (!question.explanation || typeof question.explanation !== 'string' || question.explanation.trim() === '') {
    errors.push('Explanation is required and must be a non-empty string');
  }
  
  // Check category
  if (!question.category || typeof question.category !== 'string' || question.category.trim() === '') {
    errors.push('Category is required and must be a non-empty string');
  }
  
  // Check difficulty
  const validDifficulties = ['easy', 'medium', 'hard'];
  if (!validDifficulties.includes(question.difficulty)) {
    errors.push('Difficulty must be one of: easy, medium, hard');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    questionId: question.id || 'unknown'
  };
}

/**
 * Validates the entire question database
 */
export function validateQuestionDatabase(questions: Question[]): DatabaseValidationResult {
  const questionResults: QuestionValidationResult[] = [];
  const seenIds = new Set<string>();
  const duplicateIds: string[] = [];
  
  // Validate each question and check for duplicate IDs
  questions.forEach(question => {
    const result = validateQuestion(question);
    questionResults.push(result);
    
    if (question.id) {
      if (seenIds.has(question.id)) {
        duplicateIds.push(question.id);
      } else {
        seenIds.add(question.id);
      }
    }
  });
  
  const validQuestions = questionResults.filter(r => r.isValid).length;
  const invalidQuestions = questionResults.length - validQuestions;
  
  return {
    isValid: invalidQuestions === 0 && duplicateIds.length === 0,
    totalQuestions: questions.length,
    validQuestions,
    invalidQuestions,
    duplicateIds,
    questionResults,
    categoryDistribution: getCategoryDistribution(questions),
    difficultyDistribution: getDifficultyDistribution(questions)
  };
}

/**
 * Analyzes category distribution in the question database
 */
export function getCategoryDistribution(questions: Question[]): CategoryDistribution {
  const distribution: CategoryDistribution = {};
  
  questions.forEach(question => {
    const category = question.category || 'Unknown';
    distribution[category] = (distribution[category] || 0) + 1;
  });
  
  return distribution;
}

/**
 * Analyzes difficulty distribution in the question database
 */
export function getDifficultyDistribution(questions: Question[]): DifficultyDistribution {
  const distribution: DifficultyDistribution = {
    easy: 0,
    medium: 0,
    hard: 0
  };
  
  questions.forEach(question => {
    if (question.difficulty === 'easy' || question.difficulty === 'medium' || question.difficulty === 'hard') {
      distribution[question.difficulty]++;
    }
  });
  
  return distribution;
}

/**
 * Checks if question IDs are unique across the database
 */
export function checkIdUniqueness(questions: Question[]): { isUnique: boolean; duplicates: string[] } {
  const seenIds = new Set<string>();
  const duplicates: string[] = [];
  
  questions.forEach(question => {
    if (question.id) {
      if (seenIds.has(question.id)) {
        if (!duplicates.includes(question.id)) {
          duplicates.push(question.id);
        }
      } else {
        seenIds.add(question.id);
      }
    }
  });
  
  return {
    isUnique: duplicates.length === 0,
    duplicates
  };
}

/**
 * Validates answer indices are within valid range (0-3)
 */
export function validateAnswerIndices(questions: Question[]): { isValid: boolean; invalidQuestions: string[] } {
  const invalidQuestions: string[] = [];
  
  questions.forEach(question => {
    if (typeof question.correctAnswer !== 'number' || 
        question.correctAnswer < 0 || 
        question.correctAnswer > 3) {
      invalidQuestions.push(question.id || 'unknown');
    }
  });
  
  return {
    isValid: invalidQuestions.length === 0,
    invalidQuestions
  };
}

/**
 * Generates a summary report of the question database validation
 */
export function generateValidationReport(result: DatabaseValidationResult): string {
  const lines: string[] = [];
  
  lines.push('=== Question Database Validation Report ===');
  lines.push(`Total Questions: ${result.totalQuestions}`);
  lines.push(`Valid Questions: ${result.validQuestions}`);
  lines.push(`Invalid Questions: ${result.invalidQuestions}`);
  lines.push(`Overall Status: ${result.isValid ? 'PASS' : 'FAIL'}`);
  lines.push('');
  
  if (result.duplicateIds.length > 0) {
    lines.push('Duplicate IDs Found:');
    result.duplicateIds.forEach(id => lines.push(`  - ${id}`));
    lines.push('');
  }
  
  lines.push('Category Distribution:');
  Object.entries(result.categoryDistribution).forEach(([category, count]) => {
    lines.push(`  ${category}: ${count} questions`);
  });
  lines.push('');
  
  lines.push('Difficulty Distribution:');
  lines.push(`  Easy: ${result.difficultyDistribution.easy} questions`);
  lines.push(`  Medium: ${result.difficultyDistribution.medium} questions`);
  lines.push(`  Hard: ${result.difficultyDistribution.hard} questions`);
  lines.push('');
  
  if (result.invalidQuestions > 0) {
    lines.push('Invalid Questions:');
    result.questionResults
      .filter(r => !r.isValid)
      .forEach(r => {
        lines.push(`  ${r.questionId}:`);
        r.errors.forEach(error => lines.push(`    - ${error}`));
      });
  }
  
  return lines.join('\n');
}