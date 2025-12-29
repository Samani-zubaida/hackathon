import { useMap } from "react-leaflet";
import { useEffect } from "react";

const FixLeafletResize = () => {
  const map = useMap();

  useEffect(() => {
    // run AFTER layout stabilizes
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);

  return null;
};


export default FixLeafletResize;