import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import PlaceCard from "./PlaceCard";

const PlaceList = () => {
  const { data, isLoading, error } = useNearbyPlaces(1500);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilterCard, setShowFilterCard] = useState(false);

  // Ref for detecting outside clicks
  const filterRef = useRef();

  // Generate dynamic categories from data
  const categories = useMemo(() => {
    if (!data) return ["All"];
    const types = Array.from(new Set(data.map(p => p.type)));
    return ["All", ...types];
  }, [data]);

  // Filter places based on selected category
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedCategory === "All") return data;

    return data.filter(
      place => place.type.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [data, selectedCategory]);

  // Close filter card on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilterCard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <p className="text-sm text-gray-500">Finding nearby places…</p>;
  if (error) return <p className="text-sm text-red-500">Error: {error.message}</p>;
  if (!data) return <p className="text-sm text-gray-500">Waiting for location…</p>;

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    setShowFilterCard(false);
  };

  return (
    <div className="h-full flex flex-col relative bg-gray-50 p-3 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-3">
       <h3 className="text-2xl font-bold bg-clip-text text-transparent 
               bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 
               drop-shadow-lg mb-3">
  Nearby Places
</h3>

        <button
          onClick={() => setShowFilterCard(prev => !prev)}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition"
        >
          Filter
        </button>
      </div>

      {/* ✅ Scrollable Filter Card */}
      {showFilterCard && (
        <div
          ref={filterRef}
          className="absolute top-10 right-3 bg-white shadow-xl rounded-lg p-3 z-50 w-48 max-h-60 overflow-y-auto"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`w-full text-left px-3 py-1 mb-1 rounded hover:bg-blue-500 hover:text-white transition
                ${selectedCategory === cat ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ✅ SCROLLABLE PLACE LIST */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {filteredData.length === 0 ? (
          <p className="text-sm text-gray-500">No places in this category.</p>
        ) : (
          filteredData.map(place => <PlaceCard key={place.id} place={place} />)
        )}
      </div>
    </div>
  );
};

export default PlaceList;
