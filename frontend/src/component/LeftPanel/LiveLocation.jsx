import React from "react";
import { useLiveLocation } from  "../../hooks/useUserLocation..js";

const LiveLocation = () => {
  const { data: location } = useLiveLocation();

  if (!location) return <div>Getting your location…</div>;
  if (location.error) return <div>Error: {location.error}</div>;

  return (
    <div>
      <h2>Your Live Location</h2>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <p>Accuracy: {location.accuracy} meters</p>
    </div>
  );
};

export default LiveLocation;
