import User from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * Middleware to protect routes by verifying JWT tokens
 */
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Auth Error:", error.message);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token has expired." });
        }

        return res.status(500).json({ success: false, message: "Server error." });
    }
};


