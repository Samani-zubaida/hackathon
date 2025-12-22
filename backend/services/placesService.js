import axios from "axios";

export const getNearbyPlaces = async (lat, lon, radius = 1500) => {
  // Ensure lat/lon are numbers
  lat = parseFloat(lat);
  lon = parseFloat(lon);

  if (isNaN(lat) || isNaN(lon)) {
    throw new Error("Invalid latitude or longitude");
  }

  // Overpass QL query
  const query = `
[out:json][timeout:25];
(
  node["amenity"](around:${radius},${lat},${lon});
  way["amenity"](around:${radius},${lat},${lon});
  relation["amenity"](around:${radius},${lat},${lon});
  
  node["tourism"](around:${radius},${lat},${lon});
  way["tourism"](around:${radius},${lat},${lon});
  relation["tourism"](around:${radius},${lat},${lon});

  node["shop"](around:${radius},${lat},${lon});
  way["shop"](around:${radius},${lat},${lon});
  relation["shop"](around:${radius},${lat},${lon});
);
out center;
`;

  try {
    const res = await axios.post("https://overpass-api.de/api/interpreter", query, {
      headers: { "Content-Type": "text/plain" },
    });

    // Map Overpass results to simplified structure
    return res.data.elements.map((place) => ({
      id: place.id,
      name: place.tags?.name || "Unnamed Place",
      type:
        place.tags?.amenity ||
        place.tags?.tourism ||
        place.tags?.shop ||
        "Unknown",
      lat: place.lat || place.center?.lat,
      lon: place.lon || place.center?.lon,
    }));
  } catch (err) {
    console.error("Overpass API error:", err.message);
    throw new Error("Failed to fetch nearby places");
  }
};
