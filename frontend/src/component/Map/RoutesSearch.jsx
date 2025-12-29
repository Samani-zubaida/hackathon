import { useState } from "react";
import { useMap } from "react-leaflet";

const searchPlace = async (query) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
  );
  const data = await res.json();
  if (!data.length) return null;

  return {
    name: data[0].display_name,
    lat: Number(data[0].lat),
    lon: Number(data[0].lon),
  };
};

const RouteSearch = ({ liveLocation, onRoute }) => {
  const map = useMap();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleRoute = async () => {
    const fromPlace = from
      ? await searchPlace(from)
      : liveLocation
      ? { lat: liveLocation.lat, lon: liveLocation.lng }
      : null;

    const toPlace = await searchPlace(to);
    if (!fromPlace || !toPlace) return;

    map.flyTo([toPlace.lat, toPlace.lon], 15, {
      duration: 1.2,
    });

    onRoute(fromPlace, toPlace);
  };

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1000] bg-white rounded-xl shadow p-2 flex gap-2">
      <input
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From (current location if empty)"
        className="px-3 py-2 text-sm border rounded w-64"
      />
      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
        className="px-3 py-2 text-sm border rounded w-64"
      />
      <button
        onClick={handleRoute}
        className="px-4 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        Go
      </button>
    </div>
  );
};

export default RouteSearch;
