import express from "express";
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .get(authMiddleware, getTodos)
    .post(authMiddleware, createTodo);
router
    .route("/:id")
    .put(authMiddleware, updateTodo)
    .delete(authMiddleware, deleteTodo);

export default router;
