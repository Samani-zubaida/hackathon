// services/streetService.js
import axios from "axios";

const MAP_TOKEN = "MLY|33917009311231237|0d29d46119403048b277c684daed84ad";

export const getStreetImages = async (lat, lon) => {
  console.log("Loaded MAP_TOKEN:", MAP_TOKEN);

  if (!MAP_TOKEN) throw new Error("Mapillary access token missing");

  const url = `https://graph.mapillary.com/images?fields=id,thumb_1024_url&access_token=${MAP_TOKEN}&closeto=${lon},${lat}&limit=5`;

  const res = await axios.get(url);

  return res.data.data.map((img) => ({
    id: img.id,
    url: img.thumb_1024_url,
  }));
};
