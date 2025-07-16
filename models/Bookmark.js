import express from "express";
const router = express.Router();

// EXAMPLE route – adjust as needed
router.get("/", (req, res) => {
    res.send("Bookmark routes are working!");
});

// Important!
export default router;
