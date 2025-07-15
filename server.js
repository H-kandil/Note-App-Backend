import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import verifyAppleToken from "verify-apple-id-token";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import bookmarkRoutes from "./routes/BookmarkRoutes.js";

dotenv.config();

const app = express();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

// Auth endpoints
app.post("/api/auth/google", async (req, res) => {
    try {
        const { tokenId } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return res.json({
            email: payload.email,
            name: payload.name,
            sub: payload.sub,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Invalid Google token" });
    }
});

app.post("/api/auth/apple", async (req, res) => {
    try {
        const { idToken } = req.body;
        const claims = await verifyAppleToken({
            idToken,
            clientId: APPLE_CLIENT_ID,
            nonce: "",
        });
        return res.json({ email: claims.email, sub: claims.sub });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Invalid Apple token" });
    }
});

// App routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.get("/", (req, res) => res.send("Backend works"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
