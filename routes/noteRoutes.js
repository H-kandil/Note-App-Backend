import express from "express";
import {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} from "../controllers/noteController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// authMiddleware routes
router
    .route("/")
    .get(authMiddleware, getNotes)
    .post(authMiddleware, createNote);
router
    .route("/:id")
    .get(authMiddleware, getNoteById)
    .put(authMiddleware, updateNote)
    .delete(authMiddleware, deleteNote);

export default router;
