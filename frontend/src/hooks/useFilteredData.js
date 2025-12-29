// hooks/useFilteredData.js
import { useMemo } from "react";

export const useFilteredData = (places, selectedCategory) => {
  return useMemo(() => {
    if (!places) return [];
    if (selectedCategory === "All") return places;
    return places.filter(
      (p) => p.type.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [places, selectedCategory]);
};
