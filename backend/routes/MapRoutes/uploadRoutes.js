// routes/uploadRoutes.js
import express from "express";
import { uploadPhoto } from "../../controllers/mapcontroller/uploadController.js";

const router = express.Router();

router.post("/", uploadPhoto);

export default router;
