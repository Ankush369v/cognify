const xlsx = require('xlsx');
const fs = require('fs');
const axios = require('axios');

/**
 * Parses an Excel or CSV file and returns a structured JSON preview.
 * @param {string} filePath - Absolute path to the file.
 * @returns {object} - { headers, rowCount, preview, summary }
 */
async function parseDataFile(filePath) {
    try {
        let workbook;

        if (filePath.startsWith('http')) {
            // Handle Cloudinary/Remote URL
            const response = await axios.get(filePath, { responseType: 'arraybuffer' });
            workbook = xlsx.read(response.data, { type: 'buffer' });
        } else {
            // Handle Local Path
            workbook = xlsx.readFile(filePath);
        }

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        if (!jsonData || jsonData.length === 0) {
            throw new Error("File is empty or could not be parsed.");
        }

        const headers = jsonData[0];
        const rows = jsonData.slice(1);

        // Generate a preview (First 30 rows max to avoid token limits)
        const previewRows = rows.slice(0, 30).map(row => {
            let obj = {};
            headers.forEach((h, i) => {
                obj[h] = row[i];
            });
            return obj;
        });

        // Basic Stats
        const summary = {
            totalRows: rows.length,
            columns: headers,
            columnCount: headers.length
        };

        return {
            fileName: filePath.split(/[\\/]/).pop(),
            headers,
            summary,
            preview: previewRows,
            rawText: JSON.stringify(previewRows) // For AI prompt
        };
    } catch (error) {
        console.error("Data Parsing Error:", error);
        // Throw the original error so the global handler can show stack trace in dev mode
        throw error;
    }
}

module.exports = { parseDataFile };
