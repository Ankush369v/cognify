const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function queryOpenAI(modelId, promptOrMessages, parameters = {}) {
    try {
        const messages = Array.isArray(promptOrMessages)
            ? promptOrMessages
            : [{ role: 'user', content: promptOrMessages }];

        const response = await openai.chat.completions.create({
            model: modelId,
            messages: messages,
            max_tokens: 2000,
            temperature: 0.7,
            ...parameters
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Service Error:", error);
        const status = error.status || 500;
        const msg = error.message || "OpenAI Generation failed";

        const detailedError = new Error(`OpenAI Error: ${msg}`);
        detailedError.status = status;
        throw detailedError;
    }
}

module.exports = { queryOpenAI };
