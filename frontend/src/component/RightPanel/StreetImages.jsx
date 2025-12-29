import React, { useState } from "react";
import { useNearbyWikimediaImages } from "../../hooks/useNearbyWikimediaImages.js.js";
import { getDistanceInMeters, estimateETA } from "../../utils/calcDistance.js";

const StreetImages = ({ onSelect, onHover, onSave }) => {
  const { images, location, error } = useNearbyWikimediaImages();
  const [mode, setMode] = useState("walk"); // walk | drive

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!location.lat) return <p className="p-4">Getting your location…</p>;

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Nearby Visuals</h3>

        {/* ETA MODE TOGGLE */}
        <div className="flex gap-1 text-xs">
          <button
            onClick={() => setMode("walk")}
            className={`px-2 py-1 rounded ${
              mode === "walk" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Walk
          </button>
          <button
            onClick={() => setMode("drive")}
            className={`px-2 py-1 rounded ${
              mode === "drive" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Drive
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {images.map((img) => {
          const distanceKm =
            img.lat && img.lon
              ? haversineDistance(
                  location.lat,
                  location.lon,
                  img.lat,
                  img.lon
                )
              : null;

          const distanceText =
            distanceKm < 1
              ? `${Math.round(distanceKm * 1000)} m`
              : `${distanceKm.toFixed(2)} km`;

          const etaText =
            distanceKm !== null ? estimateETA(distanceKm, mode) : "—";

          return (
            <div
              key={img.id}
              onClick={() => onSelect(img)}
              onMouseEnter={() => onHover(img.id)}
              onMouseLeave={() => onHover(null)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:ring-2 ring-blue-400"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-3">
                <h4 className="font-semibold text-sm line-clamp-1">
                  {img.title}
                </h4>

                <p className="text-xs text-gray-600 line-clamp-2">
                  {img.description}
                </p>

                {/* DISTANCE + ETA */}
                <div className="mt-2 flex justify-between text-xs text-gray-700">
                  <span>📏 {distanceText}</span>
                  <span>⏱ {etaText}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSave(img);
                  }}
                  className="mt-2 text-xs text-blue-600"
                >
                  Save to timeline
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreetImages;
