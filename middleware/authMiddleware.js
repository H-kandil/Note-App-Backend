import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization; // "Bearer <token>"

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
