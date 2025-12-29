import { useEffect, useState } from "react";

export const usePlacesAlongRoute = (routeCoords) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!routeCoords || routeCoords.length < 2) {
      setPlaces([]);
      return;
    }

    // Sample every ~5th point to avoid API spam
    const sampledPoints = routeCoords.filter((_, i) => i % 5 === 0);

    const fetchPlaces = async () => {
      try {
        const queries = sampledPoints.map(([lng, lat]) => `
          node(around:300, ${lat}, ${lng})["amenity"~"cafe|restaurant|bar|pub|fast_food|ice_cream"];
        `);

        const query = `
          [out:json];
          (
            ${queries.join("")}
          );
          out body;
        `;

        const res = await fetch(
          "https://overpass-api.de/api/interpreter",
          {
            method: "POST",
            body: query,
          }
        );

        const data = await res.json();

        // Deduplicate by ID
        const unique = new Map();
        data.elements.forEach((el) => {
          unique.set(el.id, el);
        });

        setPlaces(Array.from(unique.values()));
      } catch (err) {
        console.error("Places along route error", err);
        setPlaces([]);
      }
    };

    fetchPlaces();
  }, [routeCoords]);

  return places;
};
