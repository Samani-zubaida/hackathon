import express from "express";
import { getAllPosts, updatePost, deletePost } from "../controllers/exploreController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getAllPosts);
router.put("/:id", protectRoute, updatePost);
router.delete("/:id", protectRoute, deletePost);
export default router;
