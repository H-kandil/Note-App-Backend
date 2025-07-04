const express = require("express");
const router = express.Router();
const {
    getPomodoros,
    createPomodoro,
    deletePomodoro,
} = require("../controllers/pomodoroController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPomodoros).post(protect, createPomodoro);

router.route("/:id").delete(protect, deletePomodoro);

module.exports = router;
