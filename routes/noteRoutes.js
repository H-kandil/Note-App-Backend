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

// All routes below are protected with JWT
router.route("/").get(protect, getNotes).post(protect, createNote);

router
    .route("/:id")
    .get(protect, getNoteById)
    .put(protect, updateNote)
    .delete(protect, deleteNote);

module.exports = router;
