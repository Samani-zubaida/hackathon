import axios from "axios";

export const getRoute = async (start, end) => {
  const url = `https://router.project-osrm.org/route/v1/driving/
    ${start.lng},${start.lat};
    ${end.lon},${end.lat}
    ?overview=full&geometries=geojson`;

  const res = await axios.get(url.replace(/\s+/g, ""));
  return res.data.routes[0];
};
