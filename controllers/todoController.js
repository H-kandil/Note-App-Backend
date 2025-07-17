import todo from "../models/Todo.js";

// Get all todos for the logged-in user
export const getTodos = async (req, res) => {
    const todos = await todo.find({ user: req.user._id });
    res.json(todos);
};

// Create a new todo
export const createTodo = async (req, res) => {
    const { text, completed } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }

    const todo = await Todo.create({
        user: req.user._id,
        text,
        completed: completed || false,
    });

    res.status(201).json(todo);
};

// Update a todo
export const updateTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (todo && todo.user.equals(req.user._id)) {
        todo.text = req.body.text || todo.text;
        todo.completed = req.body.completed ?? todo.completed;

        const updated = await todo.save();
        res.json(updated);
    } else {
        res.status(404).json({ message: "todo not found or unauthorized" });
    }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (todo && todo.user.equals(req.user._id)) {
        await todo.deleteOne();
        res.json({ message: "todo deleted" });
    } else {
        res.status(404).json({ message: "todo not found or unauthorized" });
    }
};
