export const roundCoordinates = (coords) => {
  const roundedCoords = {};
  for (const [key, value] of Object.entries(coords)) {
    roundedCoords[key] = parseFloat(value.toFixed(6));
  }
  return roundedCoords;
};
