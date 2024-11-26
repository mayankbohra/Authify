import express from "express";
import { verifyToken, checkRole } from "../middleware/verifyToken.js";
import { User } from "../models/user.model.js";

const router = express.Router();

// Admin - Fetch managers and users
router.get("/admin/dashboard", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const managersAndUsers = await User.find(
            { role: { $in: ["manager", "user"] } },
            "name email role"
        );

        res.json({
            success: true,
            message: "Admin dashboard data fetched successfully",
            data: managersAndUsers,
        });
    } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Admin - Delete user by ID
router.delete("/admin/delete/:id", verifyToken, checkRole("admin"), async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            message: `User ${deletedUser.name} deleted successfully`,
            data: deletedUser,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Manager - Fetch managers and users
router.get("/manager/dashboard", verifyToken, checkRole("manager"), async (req, res) => {
    try {
        const managersAndUsers = await User.find(
            { role: { $in: ["manager", "user"] } },
            "name email role"
        );

        res.json({
            success: true,
            message: "Manager dashboard data fetched successfully",
            data: managersAndUsers,
        });
    } catch (error) {
        console.error("Error fetching manager dashboard data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// User - Fetch own profile
router.get("/user/:id", verifyToken, checkRole("user"), async (req, res) => {
    const { id } = req.params;

    try {
        if (req.user._id.toString() !== id) {
            return res.status(403).json({ success: false, message: "Forbidden - access denied" });
        }

        const user = await User.findById(id, "name email role lastLogin isVerified");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;
