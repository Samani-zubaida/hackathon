import { useState, useEffect } from "react";

export const useNearbyWikimediaImages = (radius = 1000, limit = 5) => {
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  // Get user location once
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
  }, []);

  // Fetch nearby Wikimedia images
  useEffect(() => {
    const fetchImages = async () => {
      if (!location.lat || !location.lon) return;

      try {
        const url = `
https://commons.wikimedia.org/w/api.php
?origin=*
&action=query
&format=json
&generator=geosearch
&ggscoord=${location.lat}|${location.lon}
&ggsradius=${radius}
&ggslimit=${limit}
&ggsnamespace=6
&prop=imageinfo
&iiprop=url|extmetadata
&iiurlwidth=400
`.replace(/\s+/g, "");

        const res = await fetch(url);
        const data = await res.json();

        let result = [];

        if (data.query?.pages) {
          result = Object.values(data.query.pages).map((p) => {
            const meta = p.imageinfo?.[0]?.extmetadata || {};
            return {
              url: p.imageinfo?.[0]?.url,
              title: p.title?.replace("File:", "") || "Nearby Place",
              description:
                meta.ImageDescription?.value?.replace(/<[^>]+>/g, "") ||
                "No description available",
            };
          });
        }

        // 🔥 Guaranteed fallback
        if (!result.length) {
          result = [
            {
              url: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Marine_Drive_Mumbai.jpg",
              title: "Marine Drive",
              description: "Iconic coastal road in Mumbai",
            },
            {
              url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/India_Gate_in_the_evening.jpg",
              title: "India Gate",
              description: "Historic monument overlooking the Arabian Sea",
            },
          ];
        }

        setImages(result.slice(0, limit));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchImages();
  }, [location, radius, limit]);

  return { images, location, error };
};
