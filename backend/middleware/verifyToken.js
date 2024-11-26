import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Middleware to verify token and attach user to request
export const verifyToken = async (req, res, next) => {
    let token = req.cookies.token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log("Decoded token:", decoded);
        // console.log("User ID:", decoded._id);

        if (!decoded || !decoded._id) {
            return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
        }

        // Fetch user from database to check the role
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user; // Attach user object to request
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }
};

// Middleware to check if the user has the required role
export const checkRole = (role) => (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({ success: false, message: "User not attached to request" });
    }

    if (req.user.role !== role) {
        return res.status(403).json({ success: false, message: "Forbidden - access denied" });
    }

    next();
};
