import jwt from "jsonwebtoken";
import user from "../models/fd.js";

const SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
