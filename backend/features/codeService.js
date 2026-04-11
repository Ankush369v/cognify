const { extractTextFromFile } = require('../utils/textExtractor');
const { mapModelId, extractJSON, executeAIQuery } = require('./common');

async function explainCode(fileElement, pastedCode, options, model, analysisDepth, outputStyle) {
  const { language, additionalInstructions } = options;
  let codeContent = pastedCode;
  if (fileElement && !pastedCode) {
    codeContent = await extractTextFromFile(fileElement.path);
  } else if (!fileElement && !pastedCode) {
    throw new Error("No input provided (file or text).");
  }

  const modelId = mapModelId(model, 'code-tools');

  const messages = [
    {
      role: 'system',
      content: `You are a Principal Software Architect and Master Technical Educator.
      
TASK: Provide a deep-dive technical explanation of the provided code.

CONTEXT:
- Language: ${language}
- Depth: ${analysisDepth || 'Deep'}
- Style: ${outputStyle || 'Highly Technical'}
${additionalInstructions ? `- Additional: ${additionalInstructions}` : ''}

ANALYSIS REQUIREMENTS:
1. Executive Summary: Explain the "High-Level Architecture" and "Design Philosophy".
2. Algorithmic Clarity: Provide formal Big O notation for time and space complexity.
3. Logical Flow: Explain the 'Data Transformation' process.
4. Correctness: Identify if the code is 'Production Ready'.
5. Quality Check: Briefly mention potential improvements or issues if visible.

JSON SCHEMA:
{
  "summary": "Robust architectural overview + design intent",
  "complexity": "Formal Big O analysis",
  "functions": [
    {
      "name": "Function Name",
      "description": "Exhaustive breakdown of behavior",
      "logic": "Step-by-step data flow analysis",
      "correctness": "Depth audit of logical integrity",
      "potentialIssues": ["List any obvious bugs or pitfalls found"],
      "optimizations": ["List any quick wins for performance/readability"]
    }
  ],
  "key_learnings": ["Modern best practices", "Maintenance concerns"]
}`
    },
    { role: 'user', content: `CODE DATA:\n${codeContent}` }
  ];

  const response = await executeAIQuery(modelId, messages, { max_tokens: 3500 });
  return extractJSON(response);
}

async function reviewCode(fileElement, pastedCode, options, model, analysisDepth, outputStyle) {
  const { operation, language, additionalInstructions } = options;
  let codeContent = pastedCode;
  if (fileElement && !pastedCode) {
    codeContent = await extractTextFromFile(fileElement.path);
  } else if (!fileElement && !pastedCode) {
    throw new Error("No input provided (file or text).");
  }

  const modelId = mapModelId(model, 'code-tools');

  const messages = [
    {
      role: 'system',
      content: `You are a Lead Security Auditor and Performance Optimization Expert.
      
TASK: Perform an exhaustive ${operation} on the code.

CONTEXT:
- Language: ${language}
- Depth: ${analysisDepth || 'Critical Audit'}
${additionalInstructions ? `- Context: ${additionalInstructions}` : ''}

AUDIT REQUIREMENTS:
1. Summary: Provide a 'Risk Map' or 'Quality Score' (1-100).
2. Function Analysis: Audit security (OWASP), performance, and readability.
3. Critical Issues: Categorize into 'Security', 'Performance', or 'Maintainability'.
4. Improved Code: Provide a masterfully rewritten version.

JSON SCHEMA:
{
  "summary": "Global Risk/Quality Map + Health Score",
  "functions": [
    {
      "name": "Component Name",
      "description": "Role in the system",
      "correctness": "Depth audit of logical correctness",
      "potentialIssues": ["Issue Type: Explanation + Impact"],
      "optimizations": ["Optimization Strategy: detail"]
    }
  ],
  "improved_code": "The full rewritten code snippet"
}`
    },
    { role: 'user', content: `CODE TO AUDIT:\n${codeContent}` }
  ];

  const response = await executeAIQuery(modelId, messages, { max_tokens: 4000 });
  return extractJSON(response);
}

module.exports = { explainCode, reviewCode };
