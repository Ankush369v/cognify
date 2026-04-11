const { extractTextFromFile } = require('../utils/textExtractor');
const { mapModelId, executeAIQuery } = require('./common');

async function generateSummary(fileElement, textInput, summaryLength, format, tone, focusKeywords, additionalInstructions, model, perspective) {
  let text;
  if (textInput) {
    text = textInput;
  } else if (fileElement) {
    text = await extractTextFromFile(fileElement.path);
  } else {
    throw new Error("No input provided (file or text).");
  }

  const modelId = mapModelId(model, 'summary');

  const messages = [
    {
      role: 'system',
      content: `You are a professional Executive Summarizer. Generate a high-quality summary based on the provided text.

PARAMETERS:
- Length: ${summaryLength} (Short: key points, Medium: standard, Long: detailed analysis)
- Format: ${format}
- Tone: ${tone}
- Perspective: ${perspective || 'General Audience'}
- Focus Keywords: ${focusKeywords || 'N/A'}
${additionalInstructions ? `- Additional Instructions: ${additionalInstructions}` : ''}

FORMAT INSTRUCTIONS:
- bullet-points: Use a organized list of the most important takeaways.
- paragraph: Use cohesive, well-structured paragraphs.
- executive-summary: Start with a high-level overview followed by key insights.

TONE INSTRUCTIONS:
- simple: Explain the concepts so a 10-year-old can understand (ELI5).
- academic: Use formal, precise, and scholarly language.
- professional: Use corporate/business appropriate language.

Text should be processed and distilled into its most valuable essence.`
    },
    { role: 'user', content: `TEXT TO SUMMARIZE: ${text.substring(0, 15000)}` }
  ];

  const response = await executeAIQuery(modelId, messages, { max_tokens: 2500 });
  return response.trim();
}

module.exports = { generateSummary };
