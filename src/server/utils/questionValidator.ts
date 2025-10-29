import { sampleQuestions } from '../data/questions';
import { 
  validateQuestionDatabase, 
  generateValidationReport,
  type DatabaseValidationResult 
} from '../../shared/utils/questionValidation';

/**
 * Validates the current question database and returns results
 */
export function validateCurrentQuestions(): DatabaseValidationResult {
  return validateQuestionDatabase(sampleQuestions);
}

/**
 * Generates and logs a validation report for the current questions
 */
export function logValidationReport(): void {
  const result = validateCurrentQuestions();
  const report = generateValidationReport(result);
  console.log(report);
}

/**
 * Checks if the current question database passes all validation requirements
 */
export function isQuestionDatabaseValid(): boolean {
  const result = validateCurrentQuestions();
  return result.isValid;
}

/**
 * Gets category distribution statistics for the current questions
 */
export function getCurrentCategoryStats() {
  const result = validateCurrentQuestions();
  return result.categoryDistribution;
}

/**
 * Gets difficulty distribution statistics for the current questions
 */
export function getCurrentDifficultyStats() {
  const result = validateCurrentQuestions();
  return result.difficultyDistribution;
}