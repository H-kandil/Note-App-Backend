import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const bookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: String,
    url: String,
    category: String,
    isPlan: Boolean,
});

const bookmark = mongoose.model("bookmark", bookmarkSchema);

export default bookmark;

