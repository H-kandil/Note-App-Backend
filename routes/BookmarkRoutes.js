import express from "express";
import {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
} from "../controllers/BookmarkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getBookmarks).post(protect, createBookmark);

router
    .route("/:id")
    .put(protect, updateBookmark)
    .delete(protect, deleteBookmark);

export default router;
