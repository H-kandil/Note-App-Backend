import express from "express";
import {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
} from "../controllers/BookmarkController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .get(authMiddleware, getBookmarks)
    .post(authMiddleware, createBookmark);

router
    .route("/:id")
    .put(authMiddleware, updateBookmark)
    .delete(authMiddleware, deleteBookmark);

export default router;
