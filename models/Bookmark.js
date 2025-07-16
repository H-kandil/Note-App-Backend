const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: "General",
        },
        isPlan: {
            type: Boolean,
            default: false, // لو false = Bookmark، لو true = Plan
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
