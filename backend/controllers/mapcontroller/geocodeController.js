// controllers/geocodeController.js
import {
  getAutocompleteResults,
  getCoordinatesFromAddress,
} from "../../services/geocodeService.js";

export const autocompleteAddress = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const suggestions = await getAutocompleteResults(query);
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({
      error: "Autocomplete failed",
      details: err.message,
    });
  }
};

export const geocodeAddress = async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: "Address is required" });

    const coords = await getCoordinatesFromAddress(address);
    res.json(coords);
  } catch (err) {
    res.status(500).json({
      error: "Geocoding failed",
      details: err.message,
    });
  }
};
