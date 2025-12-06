// routes/routeRoutes.js
import express from "express";
import { getRoute } from "../../controllers/mapcontroller/routeController.js";

const router = express.Router();

router.get("/", getRoute); // startLat,startLon,endLat,endLon

export default router;
