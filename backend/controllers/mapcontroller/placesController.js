// controllers/placesController.js
import { getNearbyPlaces } from "../../services/placesService.js";

export const fetchNearbyPlaces = async (req, res) => {
  try {
    const { lat, lon, radius = 1500 } = req.query;

    if (!lat || !lon)
      return res.status(400).json({ error: "lat & lon are required" });

    const places = await getNearbyPlaces(lat, lon, radius);
    res.json(places);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch nearby places",
      details: err.message,
    });
  }
};
