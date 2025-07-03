const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Handle CORS for requests from frontend (http://127.0.0.1:5500)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Backend is working");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
