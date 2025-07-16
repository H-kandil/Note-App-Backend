import express from "express";
import {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.route("/").get(protect, getNotes).post(protect, createNote);
router
    .route("/:id")
    .get(protect, getNoteById)
    .put(protect, updateNote)
    .delete(protect, deleteNote);

export default router;
