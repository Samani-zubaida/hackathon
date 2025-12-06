// controllers/streetViewController.js
import { getStreetImages } from "../../services/streetService.js";

export const fetchStreetView = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon)
      return res.status(400).json({ error: "lat & lon are required" });

    const images = await getStreetImages(lat, lon);
    res.json(images);
  } catch (err) {
    res.status(500).json({
      error: "Street view fetch failed",
      details: err.message,
    });
  }
};
