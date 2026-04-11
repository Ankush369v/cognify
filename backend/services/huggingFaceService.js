const axios = require('axios');

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;

async function queryModel(modelId, promptOrMessages, parameters = {}) {
    try {
        // MANDATORY: HF has moved to the Router domain for all modern calls.
        // This remains 100% FREE for serverless models (7B/8B/9B).
        const url = 'https://router.huggingface.co/v1/chat/completions';

        // Convert the input into the Chat Completion (Messages) format
        // This avoids 404/410 errors and is the only supported way now.
        let messages;
        if (Array.isArray(promptOrMessages)) {
            messages = promptOrMessages;
        } else {
            messages = [{ role: 'user', content: promptOrMessages }];
        }

        const config = {
            headers: {
                Authorization: `Bearer ${HF_TOKEN}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 30000 // 30 seconds
        };

        const payload = {
            model: modelId,
            messages: messages,
            max_tokens: parameters.max_tokens || 1500,
            ...parameters
        };

        let response;
        try {
            response = await axios.post(url, payload, config);
        } catch (error) {
            // Retry once if socket disconnected before TLS established
            if (error.message.includes('socket disconnected') || error.code === 'ECONNRESET') {
                console.warn("⚠️ HF Network Error. Retrying once...");
                response = await axios.post(url, payload, config);
            } else {
                throw error;
            }
        }

        // The Router response follows the standard Chat Completion format
        if (response.data.choices && response.data.choices[0]) {
            return response.data.choices[0].message.content;
        }

        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const errorData = error.response?.data;
        const msg = errorData?.error?.message || errorData?.message || error.message;

        console.error(`\n--- HF ROUTER ERROR ---`);
        console.error(`Status: ${status}`);
        console.error(`Message: ${typeof msg === 'object' ? JSON.stringify(msg) : msg}`);
        console.error(`------------------------\n`);

        const detailedError = new Error(`AI Generation failed: ${typeof msg === 'object' ? JSON.stringify(msg) : msg}`);
        detailedError.status = status || 500;
        throw detailedError;
    }
}

module.exports = { queryModel };
