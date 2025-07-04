const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
    cors({
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes"); // << أضفنا ده

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/bookmarks", bookmarkRoutes); // << وأضفنا ده

app.get("/", (req, res) => {
    res.send("Backend is working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
