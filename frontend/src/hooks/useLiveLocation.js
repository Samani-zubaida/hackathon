// src/hooks/useLiveLocation.js
import { useEffect, useState, useRef } from "react";

const DISTANCE_THRESHOLD = 80; // meters

function getDistance(a, b) {
  const R = 6371e3;
  const φ1 = (a.lat * Math.PI) / 180;
  const φ2 = (b.lat * Math.PI) / 180;
  const Δφ = ((b.lat - a.lat) * Math.PI) / 180;
  const Δλ = ((b.lng - a.lng) * Math.PI) / 180;

  const x =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

const useLiveLocation = () => {
  const [location, setLocation] = useState(null);
  const lastLocation = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const nextLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        // First location → always set
        if (!lastLocation.current) {
          lastLocation.current = nextLocation;
          setLocation(nextLocation);
          return;
        }

        const distance = getDistance(
          lastLocation.current,
          nextLocation
        );

        // ✅ Update only if user moved enough
        if (distance > DISTANCE_THRESHOLD) {
          lastLocation.current = nextLocation;
          setLocation(nextLocation);
        }
      },
      (err) => console.error(err),
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return location;
};

export default useLiveLocation;
