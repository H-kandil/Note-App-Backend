import bookmark from "../models/bookmark.js";

export const getBookmarks = async (req, res) => {
    const bookmarks = await bookmark.find({ user: req.user._id });
    res.json(bookmarks);
};

export const createBookmark = async (req, res) => {
    const { title, url, category, isPlan } = req.body;

    if (!title || !url) {
        return res.status(400).json({ message: "Title and URL are required" });
    }

const newBookmark = await bookmark.create({
        user: req.user._id,
        title,
        url,
        category,
        isPlan: !!isPlan,
    });

    res.status(201).json(newBookmark);
};

export const updateBookmark = async (req, res) => {
const bookmark = await bookmark.findById(req.params.id);

    if (bookmark && bookmark.user.equals(req.user._id)) {
        bookmark.title = req.body.title || bookmark.title;
        bookmark.url = req.body.url || bookmark.url;
        bookmark.category = req.body.category || bookmark.category;
        bookmark.isPlan = req.body.isPlan ?? bookmark.isPlan;

        const updated = await bookmark.save();
        res.json(updated);
    } else {
        res.status(404).json({ message: "bookmark not found or unauthorized" });
    }
};

export const deleteBookmark = async (req, res) => {
    const bookmark = await bookmark.findById(req.params.id);

    if (bookmark && bookmark.user.equals(req.user._id)) {
        await bookmark.deleteOne();
        res.json({ message: "bookmark deleted" });
    } else {
        res.status(404).json({ message: "bookmark not found or unauthorized" });
    }
};
