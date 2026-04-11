const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../../utils/wrapAsync.js");
const { isLoggedIn } = require("../../middleware.js");
const multer = require("multer");
const { storage } = require("../../cloudinaryConfig.js");
const upload = multer({ storage });
const featureController = require("../../controllers/featureController.js");

// Generate MCQ
router.post("/mcq", isLoggedIn, upload.single("file"), wrapAsync(featureController.generateMcq));

// Generate Summary
router.post("/summary", isLoggedIn, upload.single("file"), wrapAsync(featureController.generateSummary));


// Code Tools (Explain & Review)
router.post("/code-tools", isLoggedIn, upload.single("file"), wrapAsync(featureController.generateCodeTools));

// Flashcards
router.post("/flashcards", isLoggedIn, upload.single("file"), wrapAsync(featureController.generateFlashcards));


// Data Visualization
router.post("/visualize", isLoggedIn, upload.single("file"), wrapAsync(featureController.generateVisualization));

module.exports = router;
