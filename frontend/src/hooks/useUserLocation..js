import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { watchLiveLocation } from "../utils/Location.js";

const LOCATION_KEY = ["live-location"];

export function useLiveLocation() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const watchId = watchLiveLocation(
      (coords) => {
        queryClient.setQueryData(LOCATION_KEY, coords);
      },
      (err) => {
        queryClient.setQueryData(LOCATION_KEY, {
          error: err,
          latitude: null,
          longitude: null,
        });
      }
    );

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [queryClient]);

  return useQuery({
    queryKey: LOCATION_KEY,
    queryFn: () => null, 
    staleTime: Infinity,
  });
}
