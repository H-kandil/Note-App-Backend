import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import verifyAppleToken from "verify-apple-id-token";
import jwt from "jsonwebtoken";

// Routes
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import pomodoroRoutes from "./routes/pomodoroRoutes.js";

// Middleware
import { authMiddleware } from "./middleware/authMiddleware.js";

// Load environment variables
dotenv.config();

const app = express();

// OAuth Clients
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// CORS headers (optional custom setup)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

// Middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());

// Google OAuth Route
app.post("/api/auth/google", async (req, res) => {
    const { idToken } = req.body;
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const token = jwt.sign(
            { sub: payload.sub, email: payload.email, name: payload.name },
            JWT_SECRET,
            { expiresIn: "2h" }
        );
        return res.json({
            token,
            sub: payload.sub,
            email: payload.email,
            name: payload.name,
        });
    } catch (err) {
        console.error("Google error", err);
        return res.json({ error: "Invalid Google token" });
    }
});

// Apple OAuth Route
app.post("/api/auth/apple", async (req, res) => {
    const { idToken } = req.body;
    try {
        const claims = await verifyAppleToken({
            idToken,
            clientId: APPLE_CLIENT_ID,
            nonce: "",
        });
        const token = jwt.sign(
            { sub: claims.sub, email: claims.email },
            JWT_SECRET,
            { expiresIn: "2h" }
        );
        return res.json({ token, sub: claims.sub, email: claims.email });
    } catch (err) {
        console.error("Apple error", err);
        return res.status(401).json({ message: "Invalid Apple token" });
    }
});

// Public routes
app.use("/api/users", userRoutes);

// Protected routes
app.use("/api/notes", authMiddleware, noteRoutes);
app.use("/api/todos", authMiddleware, todoRoutes);
app.use("/api/bookmarks", authMiddleware, bookmarkRoutes);
app.use("/api/pomodoros", authMiddleware, pomodoroRoutes);

// Health check
app.get("/", (req, res) => res.send("Backend works"));

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
