const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

// Auto delete after 3 days
tokenBlacklistSchema.index({ createdAt: 1 }, {
    expireAfterSeconds: 60 * 60 * 24 * 3
});

const tokenBlackListModel = mongoose.model("tokenBlackList", tokenBlacklistSchema);

// ✅ CRITICAL LINE
module.exports = tokenBlackListModel;