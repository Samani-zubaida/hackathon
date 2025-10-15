import express from 'express';      
import dotenv from 'dotenv';
import userRouters from './routes/userRoutes.js';
import { connectDB } from "./lib/db.js";
import PostRouters from './routes/postRoutes.js';
import exploreRouter from "./routes/exploreRouter.js";
import OpenAI from "openai";
import chatRoutes from "./routes/chatRoutes.js"
dotenv.config(); 


import cors from 'cors';
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from backend");
});

app.use(cors());
app.use(express.json()); //

app.use((req, res, next) => {
  console.log("Raw body:", req.body);
  next();
});

app.use('/api/users', userRouters);
app.use("/api/posts" , PostRouters);
app.use("/api/explore" , exploreRouter);
app.use("/api", chatRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
    connectDB();
});

