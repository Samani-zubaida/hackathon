// services/placesService.js
import axios from "axios";

export const getNearbyPlaces = async (lat, lon, radius) => {
  const query = `
    [out:json];
    (
      node["amenity"](around:${radius},${lat},${lon});
      node["tourism"](around:${radius},${lat},${lon});
      node["shop"](around:${radius},${lat},${lon});
    );
    out center;
  `;

  const url = "https://overpass-api.de/api/interpreter";

  const res = await axios.post(url, query, {
    headers: { "Content-Type": "text/plain" },
  });

  return res.data.elements.map((place) => ({
    id: place.id,
    name: place.tags?.name || "Unnamed Place",
    type: place.tags?.amenity || place.tags?.tourism || place.tags?.shop || "Unknown",
    lat: place.lat,
    lon: place.lon,
  }));
};
