// services/routeService.js
import axios from "axios";

export const getRouteFromOSRM = async (start, end) => {
  // start = "lat,lon"
  // end = "lat,lon"

  const url = `https://router.project-osrm.org/route/v1/foot/${start};${end}?overview=full&geometries=geojson`;

  const res = await axios.get(url);

  if (!res.data.routes || res.data.routes.length === 0)
    throw new Error("No route found");

  return res.data.routes[0]; // distance, duration, geometry
};
