// controllers/locationController.js
export const updateUserLocation = async (req, res) => {
  try {
    const { lat, lon } = req.body;

    if (!lat || !lon)
      return res.status(400).json({ error: "lat & lon required" });

    res.json({
      message: "Location updated",
      coords: { lat, lon },
    });
  } catch (err) {
    res.status(500).json({
      error: "Location update failed",
      details: err.message,
    });
  }
};
