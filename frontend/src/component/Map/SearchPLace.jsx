import { useState } from "react";
import { useMap } from "react-leaflet";

const SearchPlace = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const map = useMap();

  const handleSearch = async () => {
    if (!query.trim()) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await res.json();
    if (!data.length) return;

    const place = {
      name: data[0].display_name,
      lat: Number(data[0].lat),
      lon: Number(data[0].lon),
    };

    map.flyTo([place.lat, place.lon], 16, { duration: 1.2 });
    onSearch(place);
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white rounded-xl shadow flex">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search place..."
        className="px-4 py-2 text-sm outline-none w-64"
      />
      <button
        onClick={handleSearch}
        className="px-4 bg-blue-500 text-white text-sm"
      >
        Search
      </button>
    </div>
  );
};


export default SearchPlace;
