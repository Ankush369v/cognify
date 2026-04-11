const { queryOpenAI } = require('../services/openAIService');
const { queryModel } = require('../services/huggingFaceService');

function mapModelId(model, featureType) {
  if (!model) return 'gpt-4o-mini';

  // OpenAI exact matches
  if (model.startsWith('gpt') || model.startsWith('o1')) {
    return model;
  }

  // Hugging Face Mappings
  const modelMappings = {
    'llama-3.1': 'meta-llama/Meta-Llama-3-8B-Instruct',
    'qwen-7b': 'Qwen/Qwen2.5-7B-Instruct',
    'qwen-coder': 'Qwen/Qwen2.5-Coder-7B-Instruct',
    'llama-3.2-1b': 'meta-llama/Llama-3.2-1B-Instruct',
    'llama-3.2-3b': 'meta-llama/Llama-3.2-3B-Instruct',
    'mixtral': 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    'gemma2': 'google/gemma-2-9b-it'
  };

  return modelMappings[model] || 'meta-llama/Meta-Llama-3-8B-Instruct';
}

function extractJSON(text) {
  if (!text) return [];
  if (typeof text !== 'string') return text;

  // Helper to fix literal control characters
  const sanitize = (str) => {
    return str.replace(/[\u0000-\u001F]+/g, (match) => {
      if (match.includes('\n') || match.includes('\r')) return ' ';
      if (match.includes('\t')) return ' ';
      return '';
    });
  };

  const tryParse = (candidate) => {
    try {
      return JSON.parse(candidate);
    } catch (e) {
      try {
        return JSON.parse(sanitize(candidate));
      } catch (e2) {
        throw e;
      }
    }
  };

  const attemptRecovery = (candidate) => {
    try {
      return tryParse(candidate);
    } catch (e) {
      let fixed = candidate.trim();
      if (fixed.endsWith(',')) fixed = fixed.slice(0, -1);

      try { return tryParse(fixed); } catch (e2) { }

      // Smarter Array Recovery: discard the last incomplete object
      if (fixed.startsWith('[')) {
        const lastBrace = fixed.lastIndexOf('}');
        if (lastBrace !== -1) {
          const chopped = fixed.substring(0, lastBrace + 1);
          try { return tryParse(chopped + ']'); } catch (e3) { }
        }
      }

      // Smarter Object Recovery
      if (fixed.startsWith('{')) {
        const lastQuote = fixed.lastIndexOf('"');
        if (lastQuote !== -1) {
          try { return tryParse(fixed + '"}'); } catch (e4) { }
          try { return tryParse(fixed + '"]'); } catch (e4) { }
        }
      }

      throw e;
    }
  };

  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*(?:```|$)/);
  if (jsonMatch) {
    try {
      return attemptRecovery(jsonMatch[1]);
    } catch (e) {
      console.warn("JSON Parse Warning (Code Block):", e.message);
    }
  }

  try {
    const firstOpenBrace = text.indexOf('{');
    const firstOpenBracket = text.indexOf('[');
    let startIdx = -1;
    let endIdx = -1;

    if (firstOpenBrace !== -1 && (firstOpenBracket === -1 || firstOpenBrace < firstOpenBracket)) {
      startIdx = firstOpenBrace;
      endIdx = text.lastIndexOf('}');
    } else if (firstOpenBracket !== -1) {
      startIdx = firstOpenBracket;
      endIdx = text.lastIndexOf(']');
    }

    if (startIdx !== -1) {
      if (endIdx === -1 || endIdx <= startIdx) {
        endIdx = text.length - 1;
      }
      const candidate = text.substring(startIdx, endIdx + 1);
      return attemptRecovery(candidate);
    }
  } catch (e) {
    console.warn("JSON Parse Warning (Heuristic):", e.message);
  }

  try {
    const cleaned = text
      .replace(/^```json\s*/, '')
      .replace(/^```\s*/, '')
      .replace(/\s*```$/, '')
      .trim();
    return attemptRecovery(cleaned);
  } catch (e) {
    console.warn("JSON Parse Warning (Raw):", e.message);
    return text;
  }
}

async function executeAIQuery(modelId, messages, options = {}) {
  if (modelId.startsWith('gpt') || modelId.startsWith('o1')) {
    return await queryOpenAI(modelId, messages, options);
  } else {
    return await queryModel(modelId, messages, options);
  }
}

module.exports = {
  mapModelId,
  extractJSON,
  executeAIQuery
};
