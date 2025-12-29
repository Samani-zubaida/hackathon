import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";

import useLiveLocation from "../../hooks/useLiveLocation";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import { useFilteredPlaces } from "../../hooks/useFilteredPlaces";
import { useInitCenter } from "../../hooks/useInitCenter";
import { useRoute } from "../../hooks/useRoute";
import { usePlacesAlongRoute } from "../../hooks/usePlacesAlongRoute";

import { FixLeafletResize } from "../../services/FixLeafletResize";
import { icons } from "./MapIcons";
import SearchPlace from "./SearchPLace";
import RouteSearch from "./RoutesSearch";

// ---------------- TILE THEMES ----------------
const NORMAL_TILES = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const ROUTE_TILES =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

// ---------------- FOLLOW USER ----------------
const FollowUser = ({ position, active }) => {
  const map = useMap();

  useEffect(() => {
    if (active && position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, active, map]);

  return null;
};

// ---------------- DISTANCE ----------------
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// ---------------- VOICE ----------------
const speak = (text) => {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const Map = ({ selectedCategory, selectedPlace, center, setCenter }) => {
  const liveLocation = useLiveLocation();
  const spokenSteps = useRef(new Set());

  const [manualRoute, setManualRoute] = useState(null);
  const [navigationOn, setNavigationOn] = useState(false);
  const [remainingRoute, setRemainingRoute] = useState([]);

  useInitCenter(liveLocation, center, setCenter);

  // ---------- PLACES ----------
  const { data: places = [] } = useNearbyPlaces(center, 1500);
  const filteredPlaces = useFilteredPlaces(
    places,
    selectedCategory,
    center
  );

  // ---------- AUTO ROUTE FROM CARD ----------
  useEffect(() => {
    if (!selectedPlace || !liveLocation) return;

    setManualRoute({
      from: { lat: liveLocation.lat, lon: liveLocation.lng },
      to: { lat: selectedPlace.lat, lon: selectedPlace.lon },
    });

    setNavigationOn(false);
    spokenSteps.current.clear();
  }, [selectedPlace, liveLocation]);

  // ---------- FROM / TO ----------
  const fromPoint = useMemo(() => {
    if (!manualRoute?.from) return liveLocation;
    return {
      lat: manualRoute.from.lat,
      lng: manualRoute.from.lng ?? manualRoute.from.lon,
    };
  }, [manualRoute, liveLocation]);

  const toPoint = useMemo(() => {
    if (!manualRoute?.to) return null;
    return {
      lat: manualRoute.to.lat,
      lng: manualRoute.to.lng ?? manualRoute.to.lon,
    };
  }, [manualRoute]);

  // ---------- ROUTE ----------
  const route = useRoute(fromPoint, toPoint);

  const hasRoute =
    !!manualRoute &&
    route &&
    Array.isArray(route.coordinates) &&
    route.coordinates.length > 1;

  const routeLatLng = useMemo(() => {
    if (!hasRoute) return [];
    return route.coordinates.map(([lng, lat]) => ({ lat, lng }));
  }, [route, hasRoute]);

  // ---------- VOICE TURN-BY-TURN ----------
  useEffect(() => {
    if (!navigationOn || !route?.legs?.[0]?.steps || !liveLocation) return;

    route.legs[0].steps.forEach((step, index) => {
      if (spokenSteps.current.has(index)) return;

      const [lng, lat] = step.maneuver.location;
      const d = getDistance(
        liveLocation.lat,
        liveLocation.lng,
        lat,
        lng
      );

      if (d < 40) {
        let msg = "Continue straight";

        if (step.maneuver.type === "turn") {
          msg = `Turn ${step.maneuver.modifier} onto ${step.name}`;
        }

        if (step.maneuver.type === "arrive") {
          msg = "You have arrived at your destination";
        }

        speak(msg);
        spokenSteps.current.add(index);
      }
    });
  }, [route, liveLocation, navigationOn]);

  // ---------- REMAINING ROUTE ----------
  useEffect(() => {
    if (!navigationOn || !liveLocation || !routeLatLng.length) return;

    const index = routeLatLng.findIndex((p) => {
      const d = getDistance(
        liveLocation.lat,
        liveLocation.lng,
        p.lat,
        p.lng
      );
      return d > 5;
    });

    setRemainingRoute(index >= 0 ? routeLatLng.slice(index) : []);
  }, [liveLocation, navigationOn, routeLatLng]);

  // ---------- PLACES ALONG ROUTE ----------
  const placesAlongRoute = usePlacesAlongRoute(
    hasRoute ? route.coordinates : null
  );

  if (!center) return <div className="p-4">Loading map…</div>;

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[center.lat, center.lon]}
        zoom={15}
        className="h-full w-full z-0"
      >
        <FixLeafletResize />

        <SearchPlace
          onSearch={(place) => {
            setCenter({ lat: place.lat, lon: place.lon });
            setManualRoute(null);
            setNavigationOn(false);
          }}
        />

        <RouteSearch
          liveLocation={liveLocation}
          onRoute={(from, to) => {
            setManualRoute({ from, to });
            setNavigationOn(false);
            spokenSteps.current.clear();
          }}
        />

        <TileLayer url={hasRoute ? ROUTE_TILES : NORMAL_TILES} />

        {liveLocation && (
          <>
            <Marker
              position={[liveLocation.lat, liveLocation.lng]}
              icon={icons.user || icons.default}
            >
              <Popup>You are here</Popup>
            </Marker>
            <FollowUser
              position={[liveLocation.lat, liveLocation.lng]}
              active={navigationOn}
            />
          </>
        )}

        {filteredPlaces.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lon]}
            icon={icons[p.category] || icons.default}
          />
        ))}

        {hasRoute && !navigationOn && (
          <>
            <Polyline
              positions={routeLatLng.map((p) => [p.lat, p.lng])}
              pathOptions={{ color: "#60a5fa", weight: 10, opacity: 0.35 }}
            />
            <Polyline
              positions={routeLatLng.map((p) => [p.lat, p.lng])}
              pathOptions={{ color: "#2563eb", weight: 5 }}
            />
          </>
        )}

        {navigationOn && remainingRoute.length > 1 && (
          <>
            <Polyline
              positions={remainingRoute.map((p) => [p.lat, p.lng])}
              pathOptions={{ color: "#60a5fa", weight: 10, opacity: 0.35 }}
            />
            <Polyline
              positions={remainingRoute.map((p) => [p.lat, p.lng])}
              pathOptions={{ color: "#2563eb", weight: 5 }}
            />
          </>
        )}

        {hasRoute &&
          placesAlongRoute.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lon]}
              icon={icons.restaurant || icons.default}
            />
          ))}
      </MapContainer>

      {hasRoute && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[9999]">
          {!navigationOn ? (
            <button
              onClick={() => {
                window.speechSynthesis.resume();
                setNavigationOn(true);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              Start Navigation
            </button>
          ) : (
            <div className="bg-white px-5 py-3 rounded-xl shadow-lg text-center">
              <div className="text-xs text-gray-500">Voice Navigation</div>
              <div className="font-semibold">Follow the route</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Map;
