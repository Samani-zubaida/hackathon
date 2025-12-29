// hooks/useFilteredPlaces.js
import { useMemo } from "react";
import { getDistanceInMeters } from "../utils/calcDistance";

export const useFilteredPlaces = (places, selectedCategory, center) => {
  return useMemo(() => {
    const filtered = selectedCategory === "All"
      ? places
      : places.filter(p => p.type?.toLowerCase() === selectedCategory.toLowerCase());

    if (!center) return filtered;

    return filtered.map(p => ({
      ...p,
      distance: getDistanceInMeters(center.lat, center.lon, p.lat, p.lon),
    }));
  }, [places, selectedCategory, center]);
};
