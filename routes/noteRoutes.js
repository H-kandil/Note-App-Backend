const express = require("express");
const router = express.Router();
const {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

// Protect all routes (must be logged in)
router.route("/").get(protect, getNotes).post(protect, createNote);
router
    .route("/:id")
    .get(protect, getNoteById)
    .put(protect, updateNote)
    .delete(protect, deleteNote);

module.exports = router;
