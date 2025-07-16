import express from "express";
import {
    getPomodoros,
    createPomodoro,
    deletePomodoro,
} from "../controllers/pomodoroController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getPomodoros).post(protect, createPomodoro);
router.route("/:id").delete(protect, deletePomodoro);

export default router;
