// routes/locationRoutes.js
import express from "express";
import { updateUserLocation } from "../../controllers/mapcontroller/locationController.js";

const router = express.Router();

router.post("/update", updateUserLocation);

export default router;
