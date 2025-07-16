const express = require("express");
const router = express.Router();
const {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
} = require("../controllers/BookmarkController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getBookmarks).post(protect, createBookmark);
router
    .route("/:id")
    .put(protect, updateBookmark)
    .delete(protect, deleteBookmark);

export default router;
