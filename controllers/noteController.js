import note from "../models/note.js";

export const getNotes = async (req, res) => {
    const notes = await note.find({ user: req.user._id });
    res.json(notes);
};

export const getNoteById = async (req, res) => {
    const note = await note.findById(req.params.id);
    if (note && note.user.equals(req.user._id)) {
        res.json(note);
    } else {
        res.status(404).json({ message: "Note not found" });
    }
};

export const createNote = async (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newNote = await note.create({
        user: req.user._id,
        title,
        content,
        category,
    });

    res.status(201).json(newNote);
};

export const updateNote = async (req, res) => {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);

    if (note && note.user.equals(req.user._id)) {
        note.title = title;
        note.content = content;
        note.category = category;
        const updated = await note.save();
        res.json(updated);
    } else {
        res.status(404).json({ message: "Note not found or unauthorized" });
    }
};

export const deleteNote = async (req, res) => {
    const note = await note.findById(req.params.id);

    if (note && note.user.equals(req.user._id)) {
        await note.deleteOne();
        res.json({ message: "Note deleted" });
    } else {
        res.status(404).json({ message: "Note not found or unauthorized" });
    }
};
