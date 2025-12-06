// routes/streetRoutes.js
import express from "express";
import { fetchStreetView } from "../../controllers/mapcontroller/streetViewController.js";

const router = express.Router();

router.get("/", fetchStreetView); // lat, lon

export default router;
