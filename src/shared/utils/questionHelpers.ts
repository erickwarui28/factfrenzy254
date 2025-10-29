import type { Question } from '../types/api';
import { validateQuestion, validateQuestionDatabase } from './questionValidation';

/**
 * Helper function to generate the next question ID in sequence
 */
export function generateNextQuestionId(existingQuestions: Question[]): string {
  const existingIds = existingQuestions.map(q => q.id);
  const numericIds = existingIds
    .filter(id => id.startsWith('q'))
    .map(id => parseInt(id.substring(1), 10))
    .filter(num => !isNaN(num));
  
  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  return `q${maxId + 1}`;
}

/**
 * Helper function to create a new question with validation
 */
export function createQuestion(
  questionText: string,
  options: [string, string, string, string],
  correctAnswerIndex: 0 | 1 | 2 | 3,
  explanation: string,
  category: string,
  difficulty: 'easy' | 'medium' | 'hard',
  existingQuestions: Question[] = []
): { question: Question; isValid: boolean; errors: string[] } {
  
  const id = generateNextQuestionId(existingQuestions);
  
  const question: Question = {
    id,
    question: questionText,
    options,
    correctAnswer: correctAnswerIndex,
    explanation,
    category,
    difficulty
  };
  
  const validation = validateQuestion(question);
  
  return {
    question,
    isValid: validation.isValid,
    errors: validation.errors
  };
}

/**
 * Helper function to add a question to an existing database with validation
 */
export function addQuestionToDatabase(
  newQuestion: Question,
  existingQuestions: Question[]
): { success: boolean; updatedQuestions: Question[]; errors: string[] } {
  
  // Validate the new question
  const questionValidation = validateQuestion(newQuestion);
  if (!questionValidation.isValid) {
    return {
      success: false,
      updatedQuestions: existingQuestions,
      errors: questionValidation.errors
    };
  }
  
  // Check for ID conflicts
  const existingIds = existingQuestions.map(q => q.id);
  if (existingIds.includes(newQuestion.id)) {
    return {
      success: false,
      updatedQuestions: existingQuestions,
      errors: [`Question ID '${newQuestion.id}' already exists`]
    };
  }
  
  // Create updated database
  const updatedQuestions = [...existingQuestions, newQuestion];
  
  // Validate the entire updated database
  const databaseValidation = validateQuestionDatabase(updatedQuestions);
  if (!databaseValidation.isValid) {
    return {
      success: false,
      updatedQuestions: existingQuestions,
      errors: ['Database validation failed after adding question']
    };
  }
  
  return {
    success: true,
    updatedQuestions,
    errors: []
  };
}

/**
 * Helper function to validate a batch of new questions before adding them
 */
export function validateQuestionBatch(
  newQuestions: Question[],
  existingQuestions: Question[] = []
): { isValid: boolean; errors: string[]; validQuestions: Question[]; invalidQuestions: Question[] } {
  
  const validQuestions: Question[] = [];
  const invalidQuestions: Question[] = [];
  const errors: string[] = [];
  
  // Check each question individually
  newQuestions.forEach(question => {
    const validation = validateQuestion(question);
    if (validation.isValid) {
      validQuestions.push(question);
    } else {
      invalidQuestions.push(question);
      errors.push(`Question ${question.id}: ${validation.errors.join(', ')}`);
    }
  });
  
  // Check for ID conflicts within the batch
  const batchIds = newQuestions.map(q => q.id);
  const duplicatesInBatch = batchIds.filter((id, index) => batchIds.indexOf(id) !== index);
  if (duplicatesInBatch.length > 0) {
    errors.push(`Duplicate IDs in batch: ${duplicatesInBatch.join(', ')}`);
  }
  
  // Check for conflicts with existing questions
  const existingIds = existingQuestions.map(q => q.id);
  const conflictingIds = batchIds.filter(id => existingIds.includes(id));
  if (conflictingIds.length > 0) {
    errors.push(`IDs conflict with existing questions: ${conflictingIds.join(', ')}`);
  }
  
  // Validate the combined database
  if (validQuestions.length > 0) {
    const combinedQuestions = [...existingQuestions, ...validQuestions];
    const databaseValidation = validateQuestionDatabase(combinedQuestions);
    if (!databaseValidation.isValid) {
      errors.push('Combined database validation failed');
    }
  }
  
  return {
    isValid: errors.length === 0 && invalidQuestions.length === 0,
    errors,
    validQuestions,
    invalidQuestions
  };
}

/**
 * Helper function to get category balance recommendations
 */
export function getCategoryBalanceRecommendations(
  questions: Question[],
  targetTotal: number = 125
): { category: string; current: number; recommended: number; needed: number }[] {
  
  const categoryStats = questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const categories = Object.keys(categoryStats);
  const targetPerCategory = Math.floor(targetTotal / categories.length);
  const remainder = targetTotal % categories.length;
  
  return categories.map((category, index) => {
    const current = categoryStats[category] || 0;
    const recommended = targetPerCategory + (index < remainder ? 1 : 0);
    const needed = Math.max(0, recommended - current);
    
    return {
      category,
      current,
      recommended,
      needed
    };
  });
}

/**
 * Helper function to get difficulty balance recommendations
 */
export function getDifficultyBalanceRecommendations(
  questions: Question[],
  targetDistribution: { easy: number; medium: number; hard: number } = { easy: 0.4, medium: 0.4, hard: 0.2 }
): { difficulty: 'easy' | 'medium' | 'hard'; current: number; recommended: number; needed: number }[] {
  
  const difficultyStats = questions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, { easy: 0, medium: 0, hard: 0 });
  
  const total = questions.length;
  
  return (['easy', 'medium', 'hard'] as const).map(difficulty => {
    const current = difficultyStats[difficulty];
    const recommended = Math.round(total * targetDistribution[difficulty]);
    const needed = Math.max(0, recommended - current);
    
    return {
      difficulty,
      current,
      recommended,
      needed
    };
  });
}