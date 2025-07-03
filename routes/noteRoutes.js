const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// Create note
router.post("/", async (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const note = new Note({ title, content, category });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: "Error saving note", error });
    }
});

// Get all notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes", error });
    }
});

// Get note by ID
router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Error fetching note", error });
    }
});

// Update note
router.put("/:id", async (req, res) => {
    const { title, content, category } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, category, updatedAt: Date.now() },
            { new: true }
        );
        if (!updatedNote)
            return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Error updating note", error });
    }
});

// Delete note
router.delete("/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote)
            return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error });
    }
});

module.exports = router;
