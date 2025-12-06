// routes/placesRoutes.js
import express from "express";
import { fetchNearbyPlaces } from "../../controllers/mapcontroller/placesController.js";

const router = express.Router();

router.get("/nearby", fetchNearbyPlaces); // lat, lon, radius

export default router;
