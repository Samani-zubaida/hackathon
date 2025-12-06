// services/geocodeService.js
import axios from "axios";

export const getAutocompleteResults = async (query) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`;

  const res = await axios.get(url, {
    headers: { "User-Agent": "geo-navigation-app" },
  });

  return res.data.map((item) => ({
    display_name: item.display_name,
    lat: item.lat,
    lon: item.lon,
  }));
};

export const getCoordinatesFromAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}&limit=1`;

  const res = await axios.get(url, {
    headers: { "User-Agent": "geo-navigation-app" },
  });

  if (res.data.length === 0)
    throw new Error("No coordinates found for address");

  const { lat, lon } = res.data[0];

  return { lat, lon };
};
