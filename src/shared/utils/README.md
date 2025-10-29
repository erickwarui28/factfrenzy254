# Question Validation Infrastructure

This module provides comprehensive validation and analysis tools for the Fact Frenzy trivia game question database.

## Features

- **Format Validation**: Ensures all questions follow the required schema
- **ID Uniqueness**: Checks for duplicate question IDs
- **Answer Index Validation**: Verifies correct answer indices are within valid range (0-3)
- **Category Distribution Analysis**: Provides statistics on question categories
- **Difficulty Distribution Analysis**: Analyzes difficulty level distribution
- **Comprehensive Reporting**: Generates detailed validation reports

## Usage

### Basic Validation

```typescript
import { validateQuestionDatabase } from './questionValidation';
import { sampleQuestions } from '../../server/data/questions';

const result = validateQuestionDatabase(sampleQuestions);
console.log(`Database is valid: ${result.isValid}`);
```

### Individual Question Validation

```typescript
import { validateQuestion } from './questionValidation';

const question = {
  id: 'q1',
  question: 'What is the capital of France?',
  options: ['London', 'Paris', 'Berlin', 'Madrid'],
  correctAnswer: 1,
  explanation: 'Paris is the capital of France.',
  category: 'Geography',
  difficulty: 'easy'
};

const result = validateQuestion(question);
if (!result.isValid) {
  console.log('Validation errors:', result.errors);
}
```

### Distribution Analysis

```typescript
import { getCategoryDistribution, getDifficultyDistribution } from './questionValidation';

const categoryStats = getCategoryDistribution(questions);
const difficultyStats = getDifficultyDistribution(questions);

console.log('Categories:', categoryStats);
console.log('Difficulties:', difficultyStats);
```

### Generate Validation Report

```typescript
import { validateQuestionDatabase, generateValidationReport } from './questionValidation';

const result = validateQuestionDatabase(questions);
const report = generateValidationReport(result);
console.log(report);
```

## Validation Rules

### Question Format Requirements

1. **ID**: Must be a non-empty string
2. **Question**: Must be a non-empty string
3. **Options**: Must be an array of exactly 4 unique, non-empty strings
4. **Correct Answer**: Must be a number between 0 and 3
5. **Explanation**: Must be a non-empty string
6. **Category**: Must be a non-empty string
7. **Difficulty**: Must be one of 'easy', 'medium', or 'hard'

### Database Requirements

1. **Unique IDs**: All question IDs must be unique across the database
2. **Valid Indices**: All correct answer indices must be within range (0-3)
3. **Complete Data**: All questions must have all required fields

## Scripts

### Validate Current Questions

```bash
npm run validate-questions
```

This script validates the current question database and provides a detailed report.

### Run Tests

```bash
npm run test:run src/shared/utils/questionValidation.test.ts
```

Runs the comprehensive test suite for the validation functions.

## API Reference

### Types

- `QuestionValidationResult`: Result of validating a single question
- `DatabaseValidationResult`: Result of validating the entire database
- `CategoryDistribution`: Statistics on question categories
- `DifficultyDistribution`: Statistics on difficulty levels

### Functions

- `validateQuestion(question)`: Validates a single question
- `validateQuestionDatabase(questions)`: Validates the entire database
- `getCategoryDistribution(questions)`: Analyzes category distribution
- `getDifficultyDistribution(questions)`: Analyzes difficulty distribution
- `checkIdUniqueness(questions)`: Checks for duplicate IDs
- `validateAnswerIndices(questions)`: Validates answer indices
- `generateValidationReport(result)`: Generates a formatted report

## Integration

This validation infrastructure is designed to be used:

1. **During Development**: To validate new questions before adding them
2. **In CI/CD**: To ensure database integrity in automated builds
3. **For Analysis**: To understand current database composition
4. **For Quality Assurance**: To maintain high question standards

## Example Output

```
=== Question Database Validation Report ===
Total Questions: 25
Valid Questions: 25
Invalid Questions: 0
Overall Status: PASS

Category Distribution:
  Animals: 6 questions
  Geography: 6 questions
  Science: 7 questions
  History: 3 questions

Difficulty Distribution:
  Easy: 10 questions
  Medium: 12 questions
  Hard: 3 questions
```