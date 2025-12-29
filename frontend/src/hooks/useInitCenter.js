// hooks/useInitCenter.js
import { useEffect } from "react";

export const useInitCenter = (liveLocation, center, setCenter) => {
  useEffect(() => {
    if (liveLocation && !center) {
      setCenter({ lat: liveLocation.lat, lon: liveLocation.lng });
    }
  }, [liveLocation, center, setCenter]);
};
