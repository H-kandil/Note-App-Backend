const mongoose = require("mongoose");

const pomodoroSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        task: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true, // in minutes
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pomodoro", pomodoroSchema);
