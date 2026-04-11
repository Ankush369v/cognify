const { generateMCQs } = require('./features/mcqService');
const { generateSummary } = require('./features/summaryService');
const { explainCode, reviewCode } = require('./features/codeService');
const { generateFlashcards } = require('./features/flashcardService');
const { visualizeData } = require('./features/dataService');

/**
 * Standard Modular API Bridge
 * 
 * This file has been refactored to modularize individual feature logic into
 * separate specialized services in the ./features directory.
 */

module.exports = {
  generateMCQs,
  generateSummary,
  explainCode,
  reviewCode,
  generateFlashcards,
  visualizeData
};
