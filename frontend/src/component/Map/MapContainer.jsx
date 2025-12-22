// src/components/map/NearbyPlacesMap.jsx
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import useLiveLocation from "../../hooks/useLiveLocation";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import { icons } from "./MapIcons.js";

const RecenterMap = ({ position }) => {
  const map = useMap();

  if (position) {
    map.setView(position, 16);
  }
  return null;
};

const Map = () => {
  const location = useLiveLocation();
  const { data: places, isLoading } = useNearbyPlaces(1500);

  if (!location) return <p>Getting your location…</p>;

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={16}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {/* User marker */}
      <Marker position={[location.lat, location.lng]}>
        <Popup>You are here 📍</Popup>
      </Marker>

      {/* Nearby places */}
      {!isLoading &&
        places?.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lon]}
            icon={icons[place.type] || icons.default}
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.type}
            </Popup>
          </Marker>
        ))}

      <RecenterMap position={[location.lat, location.lng]} />
    </MapContainer>
  );
};

export default Map;
