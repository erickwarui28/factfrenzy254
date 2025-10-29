/**
 * Simple test script to validate our validation functions work
 */

import { sampleQuestions } from '../data/questions';
import { validateQuestionDatabase, generateValidationReport } from '../../shared/utils/questionValidation';

console.log('Testing question validation infrastructure...\n');

// Test the validation functions
const result = validateQuestionDatabase(sampleQuestions);
const report = generateValidationReport(result);

console.log(report);

// Test specific validation functions
console.log('\n=== Additional Validation Tests ===');

// Check if all questions have unique IDs
const ids = sampleQuestions.map(q => q.id);
const uniqueIds = new Set(ids);
console.log(`Total questions: ${sampleQuestions.length}`);
console.log(`Unique IDs: ${uniqueIds.size}`);
console.log(`ID uniqueness: ${ids.length === uniqueIds.size ? 'PASS' : 'FAIL'}`);

// Check answer indices
const invalidAnswers = sampleQuestions.filter(q => 
  typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3
);
console.log(`Invalid answer indices: ${invalidAnswers.length === 0 ? 'PASS' : 'FAIL'}`);

// Check required fields
const missingFields = sampleQuestions.filter(q => 
  !q.id || !q.question || !q.options || q.options.length !== 4 || 
  !q.explanation || !q.category || !q.difficulty
);
console.log(`Required fields check: ${missingFields.length === 0 ? 'PASS' : 'FAIL'}`);

console.log('\n✅ Validation infrastructure test complete!');