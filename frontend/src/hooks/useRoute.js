import { useEffect, useState } from "react";

export const useRoute = (from, to) => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (
      !from ||
      !to ||
      !from.lat ||
      !from.lng ||
      !to.lat ||
      !to.lng
    ) {
      setRoute(null);
      return;
    }

    const fetchRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;

        const res = await fetch(url);
        const data = await res.json();

        console.log("OSRM RESPONSE:", data); // 🔍 IMPORTANT

        if (
          !data.routes ||
          data.routes.length === 0 ||
          !data.routes[0].geometry ||
          !data.routes[0].geometry.coordinates
        ) {
          setRoute(null);
          return;
        }

        setRoute({
          coordinates: data.routes[0].geometry.coordinates,
          distance: data.routes[0].distance,
          duration: data.routes[0].duration,
        });
      } catch (err) {
        console.error("Route fetch error:", err);
        setRoute(null);
      }
    };

    fetchRoute();
  }, [
    from?.lat,
    from?.lng,
    to?.lat,
    to?.lng,
  ]);

  return route;
};
