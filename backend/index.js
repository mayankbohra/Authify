import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './db/connectdb.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());        // Parse JSON bodies in the request object and make it available in req.body property of the route handler
app.use(cookieParser());        // Parse Cookie header and populate req.cookies with an object keyed by the cookie names

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port: ', PORT);
});
