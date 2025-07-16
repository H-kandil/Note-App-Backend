import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Handle user signup
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
        return res.status(409).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed });
    const token = jwt.sign(
        { sub: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.status(201).json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
    });
};

// Handle user login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { sub: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );
    res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
    });
};
