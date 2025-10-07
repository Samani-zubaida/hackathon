import express from 'express';
import dotenv from 'dotenv';
import userRouters from './routes/userRoutes.js';
import { connectDB } from "./lib/db.js";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
    res.send("Hello from backend");
});

app.use(express.json());

import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);
app.listen(5000, () => {
    console.log('Server running on port 5000');
    connectDB();

});

