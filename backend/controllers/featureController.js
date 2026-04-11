const User = require("../models/User.js");
const GeneratedContent = require("../models/content.js");
const { v4: uuidv4 } = require("uuid");
const {
    generateMCQs,
    generateSummary,
    explainCode,
    reviewCode,
    generateFlashcards,
    visualizeData
} = require("../apiCalls.js");

module.exports.generateMcq = async (req, res) => {
    let { questionCount, difficulty, topic, audience, tone, language, additionalInstructions, model, textInput, questionStyle, bloomLevel } = req.body;

    if (!req.file && !textInput) {
        return res.status(400).json({ error: "Please upload a file or provide text input." });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    let fileId;
    if (req.file) {
        fileId = uuidv4();
        user.fileUrl.push({ path: req.file.path, fileId: fileId });
        await user.save();
    }

    const fileElement = req.file ? user.fileUrl.find(el => el.fileId === fileId) : null;

    let mcqs = await generateMCQs(
        fileElement,
        textInput,
        questionCount,
        difficulty,
        topic,
        audience,
        tone,
        language,
        additionalInstructions,
        model,
        questionStyle,
        bloomLevel
    );

    if (typeof mcqs === "string") {
        if (mcqs.startsWith("```")) {
            mcqs = mcqs
                .replace(/^```json/, "")
                .replace(/^```/, "")
                .replace(/```$/, "")
                .trim();
        }
        try {
            mcqs = JSON.parse(mcqs);
        } catch (err) {
            console.error("MCQ Parse Error:", err);
        }
    }

    const content = await GeneratedContent.create({
        user: req.user.id,
        type: "mcq",
        fileId: fileId,
        meta: {
            questionCount,
            difficulty,
            topic,
            audience,
            tone,
            language,
            additionalInstructions,
            model,
            questionStyle,
            bloomLevel
        },
        inputContent: textInput || null,
        data: mcqs,
    });

    res.status(200).json({ success: true, data: mcqs, contentId: content._id });
};

module.exports.generateSummary = async (req, res) => {
    let { summaryLength, format, tone, focusKeywords, additionalInstructions, model, textInput, perspective } = req.body;

    if (!req.file && !textInput) {
        return res.status(400).json({ error: "Please upload a file or provide text input." });
    }

    const user = await User.findById(req.user.id);

    let fileId;
    if (req.file) {
        fileId = uuidv4();
        user.fileUrl.push({ path: req.file.path, fileId: fileId });
        await user.save();
    }

    const fileElement = req.file ? user.fileUrl.find(el => el.fileId === fileId) : null;

    let generatedSummary = await generateSummary(
        fileElement,
        textInput,
        summaryLength,
        format,
        tone,
        focusKeywords,
        additionalInstructions,
        model,
        perspective
    );

    const content = await GeneratedContent.create({
        user: req.user.id,
        type: "summary",
        fileId: fileId,
        meta: {
            summaryLength,
            format,
            tone,
            focusKeywords,
            additionalInstructions,
            model,
            perspective
        },
        inputContent: textInput || null,
        data: generatedSummary,
    });

    res.status(200).json({ success: true, data: generatedSummary, contentId: content._id });
};

module.exports.generateCodeTools = async (req, res) => {
    const operation = req.body.operation || "explain";
    const language = req.body.language || "auto";
    const additionalInstructions = req.body.additionalInstructions || "";
    const pastedCode = req.body.codeText;
    const model = req.body.model || "gemini-2.5-flash";
    const analysisDepth = req.body.analysisDepth;
    const outputStyle = req.body.outputStyle;

    if (!req.file && !pastedCode) {
        return res.status(400).json({ error: "Please upload a file or paste code." });
    }

    let codeContent;
    let fileId;
    const user = await User.findById(req.user.id);

    if (req.file) {
        fileId = uuidv4();
        user.fileUrl.push({ path: req.file.path, fileId });
        await user.save();
    }

    const fileElement = req.file ? user.fileUrl.find(el => el.fileId === fileId) : null;

    let aiResponse;
    if (operation.toLowerCase() === "explain") {
        aiResponse = await explainCode(
            fileElement,
            pastedCode,
            { language, additionalInstructions },
            model,
            analysisDepth,
            outputStyle
        );
    } else {
        aiResponse = await reviewCode(
            fileElement,
            pastedCode,
            { operation, language, additionalInstructions },
            model,
            analysisDepth,
            outputStyle
        );
    }

    if (typeof aiResponse === "string") {
        try {
            if (aiResponse.startsWith("```")) {
                aiResponse = aiResponse
                    .replace(/^```json/, "")
                    .replace(/^```/, "")
                    .replace(/```$/, "")
                    .trim();
            }
            aiResponse = JSON.parse(aiResponse);
        } catch (err) {
            // Fallback for non-JSON response from AI
        }
    }

    const content = await GeneratedContent.create({
        user: req.user.id,
        type: operation.toLowerCase(),
        fileId: fileId ? fileId : "pasted-code",
        meta: { model, operation, language, additionalInstructions, analysisDepth, outputStyle },
        inputContent: pastedCode || (req.file ? "File content" : null),
        data: aiResponse,
    });

    res.status(200).json({ success: true, data: aiResponse, input: codeContent, contentId: content._id });
};

module.exports.generateFlashcards = async (req, res) => {
    let { difficulty, focusTopics, count, additionalInstructions, model, textInput, cardStyle, detailLevel } = req.body;

    if (!req.file && !textInput) {
        return res.status(400).json({ error: "Please upload a file or provide text input." });
    }

    const user = await User.findById(req.user.id);

    let fileId;
    if (req.file) {
        fileId = uuidv4();
        user.fileUrl.push({ path: req.file.path, fileId });
        await user.save();
    }

    const fileElement = req.file ? user.fileUrl.find(el => el.fileId === fileId) : null;
    let flashcards = await generateFlashcards(
        fileElement,
        textInput,
        difficulty,
        focusTopics,
        count,
        additionalInstructions,
        model,
        cardStyle,
        detailLevel
    );

    if (typeof flashcards === "string") {
        if (flashcards.startsWith("```")) {
            flashcards = flashcards
                .replace(/^```json/, "")
                .replace(/^```/, "")
                .replace(/```$/, "")
                .trim();
        }
        try {
            flashcards = JSON.parse(flashcards);
        } catch (err) {
            console.error("Flashcard Parse Error:", err);
        }
    }

    const content = await GeneratedContent.create({
        user: req.user.id,
        type: "flashcards",
        fileId: fileId,
        meta: {
            difficulty,
            focusTopics,
            count,
            additionalInstructions,
            model,
            cardStyle,
            detailLevel
        },
        inputContent: textInput || null,
        data: flashcards,
    });

    res.status(200).json({ success: true, data: flashcards, contentId: content._id });
};


module.exports.generateVisualization = async (req, res) => {
    let { analysisType, focusColumns, visualizationGoal, model, textInput, dashboardTheme, includeInsights } = req.body;

    if (!req.file && !textInput) {
        return res.status(400).json({ error: "Please upload a file or provide text input." });
    }

    const user = await User.findById(req.user.id);

    let fileId;
    if (req.file) {
        fileId = uuidv4();
        user.fileUrl.push({ path: req.file.path, fileId });
        await user.save();
    }

    const fileElement = req.file ? user.fileUrl.find(el => el.fileId === fileId) : null;

    let visualizationResult = await visualizeData(
        fileElement,
        textInput,
        focusColumns,
        analysisType,
        dashboardTheme,
        includeInsights,
        model,
        visualizationGoal
    );

    const content = await GeneratedContent.create({
        user: req.user.id,
        type: "visualize",
        fileId,
        meta: {
            model,
            analysisType,
            focusColumns,
            visualizationGoal,
            dashboardTheme,
            includeInsights
        },
        data: visualizationResult.visualizations,
        inputContent: textInput ? textInput : JSON.stringify(visualizationResult.preview)
    });

    res.status(200).json({
        success: true,
        data: visualizationResult.visualizations,
        preview: visualizationResult.preview,
        contentId: content._id
    });
};
