const { extractTextFromFile } = require('../utils/textExtractor');
const { mapModelId, extractJSON, executeAIQuery } = require('./common');

async function generateMCQs(fileElement, textInput, questionCount, difficulty, topic, audience, tone, language, additionalInstructions, model, questionStyle, bloomLevel) {
  let text;
  if (textInput) {
    text = textInput;
  } else if (fileElement) {
    text = await extractTextFromFile(fileElement.path);
  } else {
    throw new Error("No input provided (file or text).");
  }

  const modelId = mapModelId(model, 'mcq');

  const messages = [
    {
      role: 'system',
      content: `You are an expert Educational Content Architect. Generate ${questionCount} high-fidelity MCQs based on the provided text.
      
PARAMETERS:
- Difficulty: ${difficulty}
- Target Audience: ${audience}
- Topic Focus: ${topic || 'General'}
- Tone: ${tone}
- Output Language: ${language}
- Question Style: ${questionStyle || 'conceptual'}
${additionalInstructions ? `- Additional Instructions: ${additionalInstructions}` : ''}

QUESTION STYLE DEFINITIONS:
- "conceptual": Focus on underlying theories and principles.
- "fact-based": Focus on specific details, dates, and hard data.

TONE DEFINITIONS:
- "tricky": Use plausible distractors and challenging phrasing.
- "academic": Formal and rigorous.
- "direct": Simple and straightforward.

CRITICAL JSON RULES:
1. Return ONLY a raw JSON array of objects.
2. Escape all double quotes inside strings using \\\". No literal newlines.
3. Schema: [{"question": "...", "options": ["...", "...", "...", "..."], "correct": "Correct option index (0-3)", "explanation": "Detailed explanation"}]`
    },
    { role: 'user', content: `TEXT TO ANALYZE: ${text.substring(0, 10000)}` }
  ];

  const response = await executeAIQuery(modelId, messages, { max_tokens: 2500 });
  return extractJSON(response);
}

module.exports = { generateMCQs };
