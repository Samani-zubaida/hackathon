import { useMap } from "react-leaflet";
import { useEffect } from "react";
export const FixLeafletResize = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize(true);
  }, [map]);
  return null;
};