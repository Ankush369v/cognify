const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fileUrl: [
        {
            path: String,
            fileId: String,
            _id: false,
        }
    ],
    generatedContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GeneratedContent"
        }
    ]
}, {
    timestamps: true  // automatically create createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);

module.exports = User;