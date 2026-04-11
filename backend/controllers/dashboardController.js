const GeneratedContent = require("../models/content.js");
const User = require("../models/User.js");
const validator = require("validator");

module.exports.getDashboard = async (req, res) => {
    const contents = await GeneratedContent.find({ user: req.user.id }).sort({
        createdAt: -1,
    });
    res.json({ success: true, contents });
};

module.exports.getContentDetails = async (req, res) => {
    const content = await GeneratedContent.findById(req.params.id);

    if (!content || content.user.toString() !== req.user.id) {
        return res.status(403).json({ error: "Access denied or content not found." });
    }

    res.json({ success: true, content });
};

module.exports.filterContents = async (req, res) => {
    const { type } = req.query;
    let query = { user: req.user.id };

    if (type && type !== 'all') query.type = type;

    const contents = await GeneratedContent.find(query).sort({ createdAt: -1 });
    res.json({ success: true, contents });
};

module.exports.deleteContent = async (req, res) => {
    const { id } = req.params;

    const deleted = await GeneratedContent.findOneAndDelete({
        _id: id,
        user: req.user.id,
    });

    if (!deleted) {
        return res.status(404).json({ error: "Content not found or unauthorized." });
    }

    res.json({ success: true, message: "Content deleted successfully." });
};

module.exports.deleteAllContents = async (req, res) => {
    await GeneratedContent.deleteMany({ user: req.user.id });
    res.json({ success: true, message: "All content deleted successfully." });
};

module.exports.getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ success: true, user });
};

module.exports.updateProfile = async (req, res) => {
    const { name, email } = req.body;

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !/^[A-Za-z.]+(?: [A-Za-z.]+)*$/.test(cleanName)) {
        return res.status(400).json({ error: "Invalid name" });
    }

    if (!validator.isEmail(cleanEmail)) {
        return res.status(400).json({ error: "Invalid email" });
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { name: cleanName, email: cleanEmail },
        { new: true, runValidators: true }
    ).select("-password");

    res.json({
        success: true,
        message: "Profile updated successfully!",
        user
    });
};
