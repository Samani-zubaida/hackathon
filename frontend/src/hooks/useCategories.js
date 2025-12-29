// hooks/useCategories.js
import { useMemo } from "react";

export const useCategories = (places) => {
  return useMemo(() => {
    if (!places) return ["All"];
    return ["All", ...new Set(places.map((p) => p.type))];
  }, [places]);
};

