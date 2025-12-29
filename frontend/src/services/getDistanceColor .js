const getDistanceColor = (distanceKm, maxKm = 2) => {
  const ratio = Math.min(distanceKm / maxKm, 1);

  const red = Math.floor(255 * ratio);
  const green = Math.floor(255 * (1 - ratio));

  return `rgb(${red}, ${green}, 0)`;
};
export default getDistanceColor;