// src/components/map/markerIcons.js
import L from "leaflet";

export const icons = {
  restaurant: new L.Icon({
    iconUrl: "/MapIcons/restraunts.jpg",
    iconSize: [32, 32],
  }),
  school: new L.Icon({
    iconUrl: "/MapIcons/chool.jpg",
    iconSize: [32, 32],
  }),
  parking: new L.Icon({
    iconUrl: "/MapIcons/parking.png",
    iconSize: [32, 32],
  }),

    pharmacy: new L.Icon({
    iconUrl: "/MapIcons/pharmacy.jpg",
    iconSize: [32, 32],
  }),

    mall: new L.Icon({
    iconUrl: "/MapIcons/mall.png",
    iconSize: [32, 32],
  }),

    hotel: new L.Icon({
    iconUrl: "/MapIcons/hotel.webp",
    iconSize: [32, 32],
  }),


     police: new L.Icon({
    iconUrl: "/MapIcons/police.jpg",
    iconSize: [32, 32],
  }),
    uuniversity: new L.Icon({
    iconUrl: "/MapIcons/uuniversity.png",
    iconSize: [32, 32],
  }),
    pow: new L.Icon({
    iconUrl: "/MapIcons/pow.avif",
    iconSize: [32, 32],

  }),
    post_office: new L.Icon({
    iconUrl: "/MapIcons/post-office.jpg",
    iconSize: [32, 32],
  }),
    clothes : new L.Icon({
    iconUrl: "/MapIcons/clothes.webp",
    iconSize: [32, 32],
  }),
  default: new L.Icon({
    iconUrl: "/MapIcons/default.jpg",
    iconSize: [28, 28],
  }),
};
