// hooks/useScrollToSelected.js
import { useEffect } from "react";

export const useScrollToSelected = (selectedPlace, cardRefs) => {
  useEffect(() => {
    if (!selectedPlace) return;
    const el = cardRefs.current[selectedPlace.id];
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selectedPlace, cardRefs]);
};
