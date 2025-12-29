const BASE_PATH = "/defaults";

const typeImageMap = {
  atm: `${BASE_PATH}/atm.jpg`,
  attraction: `${BASE_PATH}/attractions.jpg`,
  attractions: `${BASE_PATH}/attractions.jpg`,

  bank: `${BASE_PATH}/bank.webp`,
  blood_bank: `${BASE_PATH}/blood-bank.jpg`,

  bus_station: `${BASE_PATH}/bus station.jpg`,
  cafe: `${BASE_PATH}/cafe.jpg`,
  car_repair: `${BASE_PATH}/car-repair.jpg`,
  cinema: `${BASE_PATH}/cinema.jpg`,
  clinic: `${BASE_PATH}/clinic.jpg`,

  convenience_store: `${BASE_PATH}/convenience-store.avif`,
  fuel: `${BASE_PATH}/fuel.jpg`,
  greengrocer: `${BASE_PATH}/greengrocer.jpg`,

  hospital: `${BASE_PATH}/hospital.avif`,
  hotel: `${BASE_PATH}/hotel.avif`,
  marketplace: `${BASE_PATH}/marketplace.png`,
  parking: `${BASE_PATH}/parking.png`,

  place_of_worship: `${BASE_PATH}/places-of-worship.webp`,
  police: `${BASE_PATH}/police.jpg`,
  school: `${BASE_PATH}/school.webp`,
  social_facility: `${BASE_PATH}/social-facility.jpg`,
};

export async function getPlaceImage(placeName, placeType) {
  try {
    const wikiUrl =
      `https://en.wikipedia.org/w/api.php` +
      `?action=query&format=json` +
      `&prop=pageimages&piprop=thumbnail&pithumbsize=600` +
      `&titles=${encodeURIComponent(placeName)}` +
      `&origin=*`;

    const res = await fetch(wikiUrl);
    const data = await res.json();
    const page = Object.values(data?.query?.pages || {})[0];

    if (page?.thumbnail?.source) {
      return page.thumbnail.source; // ✅ external image
    }
  } catch (e) {
    console.warn("Wiki image failed");
  }

  // 🔁 normalize place type
  const key = placeType
    ?.toLowerCase()
    .replace(/\s+/g, "_");

  return typeImageMap[key] || `${BASE_PATH}/default-image.webp`;
}
