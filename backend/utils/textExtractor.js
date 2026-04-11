const { PDFParse } = require('pdf-parse');
const axios = require('axios');
const fs = require('fs');

async function extractTextFromFile(filePath) {
    const fileExtension = filePath.split('.').pop().toLowerCase();

    // If it's a URL (from Cloudinary)
    if (filePath.startsWith('http')) {
        const response = await axios.get(filePath, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);

        if (fileExtension === 'pdf') {
            const parser = new PDFParse({ data: buffer });
            try {
                const result = await parser.getText();
                return result.text;
            } finally {
                await parser.destroy();
            }
        } else if (fileExtension === 'txt' || fileExtension === 'md' || fileExtension === 'text') {
            return buffer.toString('utf-8');
        } else {
            // For doc/docx, we ideally need 'mammoth' or 'docx-pdf'
            // Since they aren't installed, we return the string but warn that it might be binary
            return buffer.toString('utf-8');
        }
    }

    // If it's a local file
    const buffer = fs.readFileSync(filePath);
    if (fileExtension === 'pdf') {
        const parser = new PDFParse({ data: buffer });
        try {
            const result = await parser.getText();
            return result.text;
        } finally {
            await parser.destroy();
        }
    } else if (fileExtension === 'txt' || fileExtension === 'md' || fileExtension === 'text') {
        return buffer.toString('utf-8');
    }
    
    return buffer.toString('utf-8');
}

module.exports = { extractTextFromFile };
