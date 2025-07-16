// controllers/bookmarkController.js
const Bookmark = require("../models/");

const getBookmarks = async (req, res) => {
    const bookmarks = await Bookmark.find({ user: req.user._id });
    res.json(bookmarks);
};

const createBookmark = async (req, res) => {
    const { title, url, category, isPlan } = req.body;

    if (!title || !url) {
        return res.status(400).json({ message: "Title and URL are required" });
    }

    const newBookmark = await Bookmark.create({
        user: req.user._id,
        title,
        url,
        category,
        isPlan: !!isPlan,
    });

    res.status(201).json(newBookmark);
};

const updateBookmark = async (req, res) => {
    const bookmark = await Bookmark.findById(req.params.id);

    if (bookmark && bookmark.user.equals(req.user._id)) {
        bookmark.title = req.body.title || bookmark.title;
        bookmark.url = req.body.url || bookmark.url;
        bookmark.category = req.body.category || bookmark.category;
        bookmark.isPlan = req.body.isPlan ?? bookmark.isPlan;

        const updated = await bookmark.save();
        res.json(updated);
    } else {
        res.status(404).json({ message: "Bookmark not found or unauthorized" });
    }
};

const deleteBookmark = async (req, res) => {
    const bookmark = await Bookmark.findById(req.params.id);

    if (bookmark && bookmark.user.equals(req.user._id)) {
        await bookmark.deleteOne();
        res.json({ message: "Bookmark deleted" });
    } else {
        res.status(404).json({ message: "Bookmark not found or unauthorized" });
    }
};

module.exports = {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
};
