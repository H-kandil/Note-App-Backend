import pomodoro from "../models/Pomodoro.js";

// Get all pomodoro logs for user
export const getPomodoros = async (req, res) => {
    const logs = await pomodoro.find({ user: req.user._id });
    res.json(logs);
};

// Create a new pomodoro log
export const createPomodoro = async (req, res) => {
    const { task, duration, completed } = req.body;

    if (!task || !duration) {
        return res
            .status(400)
            .json({ message: "Task and duration are required" });
    }

    const newLog = await pomodoro.create({
        user: req.user._id,
        task,
        duration,
        completed: completed || false,
    });

    res.status(201).json(newLog);
};

// Delete a pomodoro log
export const deletePomodoro = async (req, res) => {
    const log = await pomodoro.findById(req.params.id);

    if (log && log.user.equals(req.user._id)) {
        await log.deleteOne();
        res.json({ message: "pomodoro log deleted" });
    } else {
        res.status(404).json({ message: "Not found or unauthorized" });
    }
};
