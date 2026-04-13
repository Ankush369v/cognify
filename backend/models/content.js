const mongoose = require("mongoose");

const generatedContentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["mcq", "summary", "review", "explain", "flashcards", "analysis", "visualize"],
    required: true,
  },
  fileId: {
    type: String,
  },

  // ✨ Flexible metadata to support all current and future features
  meta: mongoose.Schema.Types.Mixed,

  inputContent: mongoose.Schema.Types.Mixed, // Original input (text, code, etc.)
  preview: mongoose.Schema.Types.Mixed,      // Dataset snapshot/preview (e.g., first 5 rows)
  data: mongoose.Schema.Types.Mixed,         // The actual generated content

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GeneratedContent", generatedContentSchema);
