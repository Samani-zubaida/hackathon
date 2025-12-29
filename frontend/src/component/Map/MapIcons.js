// src/components/map/markerIcons.js
import L from "leaflet";

// Fix Leaflet default icon path issues (important)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const icons = {
  user: new L.Icon({
    iconUrl: "/MapIcons/user.png", 
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  }),

  restaurant: new L.Icon({
    iconUrl: "/MapIcons/restraunts.jpg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  school: new L.Icon({
    iconUrl: "/MapIcons/chool.jpg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  parking: new L.Icon({
    iconUrl: "/MapIcons/parking.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  pharmacy: new L.Icon({
    iconUrl: "/MapIcons/pharmacy.jpg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  mall: new L.Icon({
    iconUrl: "/MapIcons/mall.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  hotel: new L.Icon({
    iconUrl: "/MapIcons/hotel.webp",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  police: new L.Icon({
    iconUrl: "/MapIcons/police.jpg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  university: new L.Icon({
    iconUrl: "/MapIcons/uuniversity.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  pow: new L.Icon({
    iconUrl: "/MapIcons/pow.avif",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  post_office: new L.Icon({
    iconUrl: "/MapIcons/post-office.jpg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  clothes: new L.Icon({
    iconUrl: "/MapIcons/clothes.webp",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),

  default: new L.Icon({
    iconUrl: "/MapIcons/default.jpg",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  }),
};
