import { useQuery } from "@tanstack/react-query";
import { fetchNearbyPlaces } from "../api/placesAPI.js";

// simple in-memory cache
const cache = new Map();

export function useNearbyPlaces(center, radius = 1500) {
  const lat = center?.lat;
  const lon = center?.lon;

  return useQuery({
    queryKey: [
      "nearby-places",
      lat ? lat.toFixed(4) : null,
      lon ? lon.toFixed(4) : null,
      radius,
    ],

    queryFn: async () => {
      const key = `${lat.toFixed(4)},${lon.toFixed(4)},${radius}`;

      if (cache.has(key)) {
        return cache.get(key);
      }

      const data = await fetchNearbyPlaces({
        lat,
        lon,
        radius,
      });

      cache.set(key, data);
      return data;
    },

    enabled: !!lat && !!lon,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
}
