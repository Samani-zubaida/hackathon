import { useEffect, useRef } from "react";
import { speak } from "../utils/speak";

const distance = (a, b) => {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) *
      Math.cos(toRad(b.lat)) *
      Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

export const useVoiceNavigation = (
  route,
  liveLocation,
  navigationOn
) => {
  const spokenSteps = useRef(new Set());

  useEffect(() => {
    if (!navigationOn || !route || !liveLocation) return;
    if (!route.legs?.[0]?.steps) return;

    const steps = route.legs[0].steps;

    steps.forEach((step, index) => {
      const [lng, lat] = step.maneuver.location;
      const stepPos = { lat, lng };

      const d = distance(liveLocation, stepPos);

      // Speak once when user is close
      if (d < 40 && !spokenSteps.current.has(index)) {
        let instruction = "";

        if (step.maneuver.type === "turn") {
          instruction = `Turn ${step.maneuver.modifier} onto ${step.name}`;
        } else if (step.maneuver.type === "arrive") {
          instruction = "You have arrived at your destination";
        } else {
          instruction = step.name
            ? `Continue on ${step.name}`
            : "Continue straight";
        }

        speak(instruction);
        spokenSteps.current.add(index);
      }
    });
  }, [route, liveLocation, navigationOn]);
};
