const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const BookmarkRoutes = require("./routes/BookmarkRoutes");
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
import verifyAppleToken from 'verify-apple-id-token';

app.post('/api/auth/apple', async (req, res) => {
  const { idToken } = req.body;
  const jwtClaims = await verifyAppleToken({
    idToken,
    clientId: APPLE_CLIENT_ID,
    nonce:
  });
  res.json({ email: jwtClaims.email, sub: jwtClaims.sub });
});


app.post("/api/auth/google", async (req, res) => {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    res.json({ email: payload.email, name: payload.name, sub: payload.sub });
});


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
//const BookmarkRoutes = require("./routes/BookmarkRoutes"); 

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/Bookmarks", BookmarkRoutes); // << وأضفنا ده

app.get("/", (req, res) => {
    res.send("Backend is working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
