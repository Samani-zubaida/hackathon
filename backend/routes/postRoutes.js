import express from "express";
import { createPost } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/posts/upload
router.post("/upload", protect, createPost);

export default router;
