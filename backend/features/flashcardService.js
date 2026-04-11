const { extractTextFromFile } = require('../utils/textExtractor');
const { mapModelId, extractJSON, executeAIQuery } = require('./common');

async function generateFlashcards(fileElement, textInput, difficulty, focusTopics, count, additionalInstructions, model, cardStyle, detailLevel) {
  let text;
  if (textInput) {
    text = textInput;
  } else if (fileElement) {
    text = await extractTextFromFile(fileElement.path);
  } else {
    throw new Error("No input provided (file or text).");
  }

  const modelId = mapModelId(model, 'flashcards');

  const messages = [
    {
      role: 'system',
      content: `You are an expert Educational Content Creator. Generate ${count} high-quality flashcards based on the provided text.
      
PARAMETERS:
- Difficulty: ${difficulty}
- Focus Topics: ${focusTopics || 'General'}
- Front Card Style: ${cardStyle || 'question'}
- Answer Detail: ${detailLevel || 'moderate'}
${additionalInstructions ? `- Additional Instructions: ${additionalInstructions}` : ''}

STYLE DEFINITIONS (CRITICAL):
1. "question": Front is a direct question (e.g., "What is photosynthesis?").
2. "term": Front is a single term or concept (e.g., "Photosynthesis"), and back is the definition.

DETAIL DEFINITIONS:
- "brief": Key points and keywords only.
- "moderate": Clear explanations with context.
- "comprehensive": Detailed breakdowns and examples.

CRITICAL JSON RULES:
1. Return ONLY a raw JSON array of objects.
2. Escape all double quotes inside strings using \\\". No literal newlines.
3. Schema: [{"question": "content for card front", "answer": "content for card back"}]`
    },
    { role: 'user', content: `TEXT TO PROCESS: ${text.substring(0, 10000)}` }
  ];

  const response = await executeAIQuery(modelId, messages, { max_tokens: 2500 });
  return extractJSON(response);
}

module.exports = { generateFlashcards };
