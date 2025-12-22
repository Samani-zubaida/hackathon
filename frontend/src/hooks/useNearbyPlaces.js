import { useQuery } from "@tanstack/react-query";
import { fetchNearbyPlaces } from "../api/placesAPI.js"
import { useLiveLocation } from "./useUserLocation..js"

export function useNearbyPlaces(radius = 1500) {
  const { data: location } = useLiveLocation();

  return useQuery({
    queryKey: [
      "nearby-places",
      location?.latitude,
      location?.longitude,
      radius,
    ],

    queryFn: () =>
      fetchNearbyPlaces({
        lat: location.latitude,
        lon: location.longitude,
        radius,
      }),

    enabled: !!location?.latitude && !!location?.longitude,

    staleTime: 30_000, // 30 seconds
    keepPreviousData: true,
  });
}
