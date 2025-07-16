import express from "express";
import {
    getPomodoros,
    createPomodoro,
    deletePomodoro,
} from "../controllers/pomodoroController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .get(authMiddleware, getPomodoros)
    .post(authMiddleware, createPomodoro);
router.route("/:id").delete(authMiddleware, deletePomodoro);

export default router;
