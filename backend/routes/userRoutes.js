import express from "express";

import {
  signup,
  signin,
  updateProfile,
  checkAuth,
} from "../controllers/userController.js";
import { protectRoute  } from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/check-auth", protectRoute , checkAuth);
router.put("/update-profile", protectRoute , updateProfile);

export default router;
