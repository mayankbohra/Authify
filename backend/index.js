import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path";

import { connectDB } from "./db/connectDB.js";
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());        // Parse JSON bodies in the request object and make it available in req.body property of the route handler
app.use(cookieParser());        // Parse Cookie header and populate req.cookies with an object keyed by the cookie names

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port: ', PORT);
});
