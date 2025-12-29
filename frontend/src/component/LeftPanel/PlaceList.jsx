import React, { useRef, useState } from "react";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import PlaceCard from "./PlaceCard";

import { useScrollToSelected } from "../../hooks/useScrollToSelected";
import { useCategories } from "../../hooks/useCategories";
import { useFilteredData } from "../../hooks/useFilteredData";

const PlaceList = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedPlace,
  selectedPlace,
  center,
}) => {
  const { data, isLoading, error } = useNearbyPlaces(center, 1500);
  const [showFilterCard, setShowFilterCard] = useState(false);
  const cardRefs = useRef({});

  // 🔹 Custom hooks
  const categories = useCategories(data);
  const filteredData = useFilteredData(data, selectedCategory);
  useScrollToSelected(selectedPlace, cardRefs);

  if (!center) return <p className="p-3">Getting location…</p>;
  if (isLoading) return <p className="p-3">Loading…</p>;
  if (error) return <p className="p-3">Error</p>;

  return (
    <div className="h-full flex flex-col p-3 min-h-0 relative">
      <div className="flex justify-between mb-2">
        <h3 className="text-xl font-bold">Nearby Places</h3>
        <button
          onClick={() => setShowFilterCard((p) => !p)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Filter
        </button>
      </div>

      {showFilterCard && (
        <div className="absolute right-3 top-10 bg-white shadow-xl rounded-lg p-2 w-44 z-50 max-h-64 overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowFilterCard(false);
              }}
              className={`block w-full text-left px-2 py-1 mb-1 rounded ${
                selectedCategory === cat ? "bg-blue-500 text-white" : "hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="h-full overflow-y-auto space-y-2 pr-1">
        {filteredData.map((place) => (
          <div key={place.id} ref={(el) => (cardRefs.current[place.id] = el)}>
            <PlaceCard
              place={place}
              onSelect={setSelectedPlace}
              isSelected={selectedPlace?.id === place.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceList;
