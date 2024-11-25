import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token payload: ", decoded);

        if (!decoded || !decoded._id) {
            return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
        }

        req.userId = decoded._id; // Assigning _id from payload to req.userId
        console.log("Decoded token user ID: ", req.userId);
        next();
    } catch (error) {
        console.log("Error verifying token: ", error);
        return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }
};
