const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { parseDataFile } = require('../utils/dataParser');
const { mapModelId, extractJSON, executeAIQuery } = require('./common');


async function visualizeData(fileElement, textInput, focusColumns, analysisType, dashboardTheme, includeInsights, model, visualizationGoal) {
  let data;
  if (textInput) {
    try {
      const workbook = xlsx.read(textInput, { type: 'string' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      if (!jsonData || jsonData.length === 0) throw new Error("Empty data");
      const headers = jsonData[0];
      const rows = jsonData.slice(1);
      let selectedRows = rows.length <= 150 ? rows : [...rows.slice(0, 50), ...rows.slice(Math.floor(rows.length/2)-25, Math.floor(rows.length/2)+25), ...rows.slice(-50)];
      const previewRows = selectedRows.map(row => {
        let obj = {};
        headers.forEach((h, i) => { obj[h] = row[i]; });
        return obj;
      });
      data = {
        summary: { totalRows: rows.length, columns: headers, columnCount: headers.length, sampleSize: selectedRows.length },
        rawText: JSON.stringify(previewRows),
        preview: previewRows
      };
    } catch (e) {
      throw new Error("Failed to parse text input.");
    }
  } else if (fileElement) {
    data = await parseDataFile(fileElement.path);
  }

  const modelId = mapModelId(model, 'data-analysis');
  const isEDA = analysisType && (analysisType.toLowerCase().includes('eda') || analysisType.toLowerCase().includes('exploratory'));

  if (isEDA) {
    const tempFilePath = path.join(__dirname, '..', 'temp_dataset.csv');
    let pythonDataSource = tempFilePath;
    if (fileElement && fileElement.path) {
      pythonDataSource = fileElement.path;
    } else {
      let csvContent = textInput || data.rawText;
      if (csvContent && csvContent.trim().startsWith('[')) {
        try {
          const jsonData = JSON.parse(csvContent);
          const headers = Object.keys(jsonData[0]);
          csvContent = headers.join(',') + '\n' + jsonData.map(row => headers.map(h => row[h]).join(',')).join('\n');
        } catch (e) { }
      }
      fs.writeFileSync(tempFilePath, csvContent || '');
    }

    try {
      const pythonScript = path.join(__dirname, '..', 'python_services', 'eda_engine.py');
      const pythonProcess = spawn('python', [pythonScript, pythonDataSource]);
      let pythonOutput = '';
      let pythonError = '';
      pythonProcess.stdout.on('data', (d) => pythonOutput += d.toString());
      pythonProcess.stderr.on('data', (d) => pythonError += d.toString());

      return new Promise((resolve, reject) => {
        pythonProcess.on('close', async (code) => {
          if (code !== 0) {
             console.error("Python failed", pythonError);
             try { fs.unlinkSync(tempFilePath); } catch (e) { }
             const systemPrompt = `You are an AI Data Scientist performing COMPLETE Exploratory Data Analysis.

MISSION: Analyze the dataset like a professional would in Jupyter Notebook, but output DASHBOARD-READY JSON (not code/markdown).

CRITICAL RULES:
✅ Return ONE valid JSON object matching the schema exactly
✅ All statistics MUST be from actual data (no fabrication)
✅ All charts MUST use real data (no placeholders)
✅ Explanations MUST be user-friendly (no jargon/code)
✅ Use escaped \\n for multi-line text
❌ NO markdown, NO code, NO methodology explanations

EDA PIPELINE (Execute Systematically):

1. DATA OVERVIEW: Count rows/columns, identify types (numerical/categorical/datetime), calculate cardinality
2. DATA QUALITY: Missing values %, duplicates, outliers (IQR method), quality score (0-100)
3. UNIVARIATE ANALYSIS:
   - Numerical: mean, median, std, Q1, Q3, skewness → Generate histograms & box plots
   - Categorical: frequency distribution → Generate bar/pie charts (pie only if <=10 categories)
4. BIVARIATE ANALYSIS: Pearson correlations, identify |r|>0.7 → Generate scatter plots for top 3
5. MULTIVARIATE: Feature interactions if >=3 numerical columns
6. OUTLIERS: IQR method (Q1-1.5×IQR, Q3+1.5×IQR) and Z-score (|z|>3)
7. INSIGHTS: Summarize distributions, relationships, quality issues
8. RECOMMENDATIONS: Data cleaning, feature engineering, encoding needs, modeling readiness

VISUALIZATION REQUIREMENTS (6-10 charts):
- 2-3 Histograms (numerical distributions)
- 1-2 Box plots (outliers)
- 2-3 Scatter plots (correlations)
- 1-2 Bar charts (categorical frequencies)
- 1 Pie chart (if applicable)

OUTPUT JSON SCHEMA:
{
  "dashboard_title": "Exploratory Data Analysis: [Dataset Name]",
  "executive_summary": "2-4 sentences: dataset size, key patterns, data health, main findings",
  "data_quality_audit": {
    "score": 85,
    "details": "X% missing, Y duplicates, Z outliers in columns A,B"
  },
  "market_trends": {
    "overview": "Main distribution patterns and relationships",
    "details": ["Insight 1", "Insight 2", "Insight 3"]
  },
  "segmentation_analysis": "Categorical grouping insights or null",
  "anomalies": ["Outlier in [Col]: value [X] is [Y] std devs from mean", "..."],
  "recommendations": ["Handle missing data in [Col]", "Transform skewed [Col]", "Encode [Col]"],
  "statistical_insights": ["[Col] mean=[X] std=[Y]", "[Col] shows [skew type]", "Correlation [A]-[B]: [r]"],
  "kpis": [
    {"label": "Total Rows", "value": "formatted", "change": "N/A", "trend": "neutral", "icon": "activity"},
    {"label": "Quality Score", "value": "X/100", "change": "N/A", "trend": "neutral", "icon": "trending-up"}
  ],
  "visualizations": [
    {
      "id": "unique_id",
      "type": "bar|line|area|pie|scatter|box|histogram|treemap",
      "title": "Distribution of [Column]",
      "description": "Mean=X, Median=Y, Skew=Z. Interpretation.",
      "layout": "half|full",
      "data": [{"name": "bin/category", "value": 10, "secondary": 5}],
      "colors": ["#6366f1", "#14b8a6"]
    }
  ]
}

NOW EXECUTE THE FULL EDA AND RETURN JSON.`;

          const aiMessages = [
            { role: 'system', content: systemPrompt },
            {
              role: 'user', content: `DATA META: ${JSON.stringify(data.summary)}
SAMPLE DATA: ${data.rawText}
FOCUS COLUMNS: ${focusColumns || 'Auto-detect'}
THEME: ${dashboardTheme}
INCLUDE INSIGHTS: ${includeInsights}`
            }
          ];

          try {
             const fallbackReport = await executeAIQuery(modelId, aiMessages, { max_tokens: 8000 }).then(extractJSON);
             resolve({ visualizations: fallbackReport, meta: data.summary, preview: data.preview });
          } catch(fallbackErr) {
             reject(fallbackErr);
          }
          return;
        }
          try {
            const edaStats = JSON.parse(pythonOutput);
            const statsForAI = { dataset_overview: edaStats.dataset_overview, data_quality_audit: edaStats.data_quality_audit, statistical_insights: edaStats.statistical_insights, market_trends_samples: edaStats.market_trends.details, anomaly_summary: edaStats.anomalies };
            const insightPrompt = `
                    You are a Senior Data Scientist.
                    
                    TASKS:
                    1. Create a "dynamic_title" that reflects the actual SUBJECT of the data (e.g., "Student Performance Study" or "Retail Sales Analysis"). DO NOT USE FILENAMES.
                    2. Write a detailed "executive_summary" (4-5 sentences) summarizing the data's health, main trends, and key findings.
                    3. Provide exhaustive descriptions for each chart.

                    DATA FOR CONTEXT: ${JSON.stringify(statsForAI).substring(0, 10000)}
                    USER GOAL: ${visualizationGoal || 'Extrapolate maximally'}

                    Return ONLY JSON:
                    {
                      "dynamic_title": "Subject-based Title",
                      "executive_summary": "In-depth overview of findings...",
                      "recommendations": ["Action 1", "Action 2", "Action 3"],
                      "segmentation_analysis": "Context for the groups found.",
                      "market_trends_overview": "Summary of identified patterns."
                    }
                    `;
            const aiResponse = await executeAIQuery(modelId, [{ role: 'system', content: insightPrompt }], { max_tokens: 2500 });
            const insights = extractJSON(aiResponse);
            const finalReport = { 
                ...edaStats, 
                dashboard_title: insights.dynamic_title || edaStats.dashboard_title, 
                executive_summary: insights.executive_summary || edaStats.executive_summary, 
                recommendations: (insights.recommendations && insights.recommendations.length > 0) ? insights.recommendations : edaStats.recommendations, 
                segmentation_analysis: insights.segmentation_analysis || "General patterns observed across the dataset.", 
                market_trends: { 
                    ...edaStats.market_trends, 
                    overview: insights.market_trends_overview || edaStats.market_trends.overview 
                } 
            };
            resolve({ visualizations: finalReport, meta: data.summary, preview: data.preview });
            try { fs.unlinkSync(tempFilePath); } catch (e) { }
          } catch (e) { reject(e); }
        });
      });
    } catch (err) { throw err; }
  } else {
    // Generic Logic
    const systemPrompt = `You are a Visualization Architect. Return ONLY valid JSON schema for ${analysisType} analysis.`;
    const response = await executeAIQuery(modelId, [{ role: 'system', content: systemPrompt }, { role: 'user', content: `DATA: ${data.rawText}` }], { max_tokens: 8000 });
    return { visualizations: extractJSON(response), meta: data.summary, preview: data.preview };
  }
}

module.exports = { visualizeData };
