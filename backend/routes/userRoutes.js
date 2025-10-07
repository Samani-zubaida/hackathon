import express from "express";

import {
  signup,
  signin,
  updateProfile,
  checkAuth,
  me,
  changeLoc
} from "../controllers/userController.js";
import { protectRoute  } from "../middleware/authMiddleware.js"

const router = express.Router();



router.get("/check-auth", protectRoute , checkAuth);
router.get("/me", me)
router.post("/signup", signup);
router.post("/signin", signin);

router.put("/update-profile", protectRoute , updateProfile);
router.put("/change-loc", protectRoute , changeLoc); 
export default router;
