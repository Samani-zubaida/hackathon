export function watchLiveLocation(onSuccess, onError) {
  if (!navigator.geolocation) {
    onError("Geolocation is not supported by this browser");
    return null;
  }

  const watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      onSuccess({ latitude, longitude, accuracy, timestamp: Date.now() });
    },
    (err) => {
      onError(err.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 20000,
    }
  );

  return watchId;
}
