const mongoose = require("mongoose");

const generatedContentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["mcq", "summary", "review", "explain", "flashcards", "analysis", "visualize", "refactor", "optimize", "document"],
    required: true,
  },
  fileId: {
    type: String,
  },

  // ✨ Flexible metadata to support all current and future features
  meta: mongoose.Schema.Types.Mixed,

  inputContent: mongoose.Schema.Types.Mixed, // Original input (text, code, etc.)
  data: mongoose.Schema.Types.Mixed, // The actual generated content

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GeneratedContent", generatedContentSchema);
