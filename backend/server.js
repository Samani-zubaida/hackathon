import express from 'express';      
import dotenv from 'dotenv';
import userRouters from './routes/userRoutes.js';
import { connectDB } from "./lib/db.js";
import PostRouters from './routes/postRoutes.js';
import exploreRouter from "./routes/exploreRouter.js";
import cors from 'cors';
const app = express();
dotenv.config();

app.get("/", (req, res) => {
    res.send("Hello from backend");
});

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouters);
<<<<<<< HEAD
=======
app.use("/api/posts" , PostRouters);
app.use("/api/explore" , exploreRouter);
>>>>>>> 70eca2b52d39bd55fee5131a842da0a21bae72dd

app.listen(5000, () => {
    console.log('Server running on port 5000');
    connectDB();

});

