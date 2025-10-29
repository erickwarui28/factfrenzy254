#!/usr/bin/env node

/**
 * Script to validate the question database
 * Run with: npx tsx src/server/scripts/validateQuestions.ts
 */

import { validateCurrentQuestions, logValidationReport } from '../utils/questionValidator';

function main() {
  console.log('Running question database validation...\n');
  
  try {
    const result = validateCurrentQuestions();
    
    // Log the full report
    logValidationReport();
    
    // Exit with appropriate code
    if (result.isValid) {
      console.log('\n✅ All validations passed!');
      process.exit(0);
    } else {
      console.log('\n❌ Validation failed. Please fix the issues above.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error during validation:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}