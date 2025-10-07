import express from "express";
import { createPost } from "../controllers/postControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/posts/upload
router.post("/upload", protectRoute, createPost);

export default router;
