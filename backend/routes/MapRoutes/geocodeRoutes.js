// routes/geocodeRoutes.js
import express from "express";
import { autocompleteAddress, geocodeAddress } from "../../controllers/mapcontroller/geocodeController.js";

const router = express.Router();

router.get("/autocomplete", autocompleteAddress);
router.get("/geocode", geocodeAddress);

export default router;
