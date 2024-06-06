import { trafficInstance } from "..";

export const fetchTraffic = (mapBounds) => {
  console.log(mapBounds);
  return trafficInstance.get();
};

export const fetchFavoriteTraffic = () => {
  return trafficInstance.get("/favorite");
};

export const addFavoriteTraffic = () => {
  return trafficInstance.post("/favorite");
};

export const fetchTrafficById = (trafficId) => {
  return trafficInstance.get(`/${trafficId}`);
};

export const deleteFavoriteTraffic = (trafficId) => {
  return trafficInstance.delete(`/favorite/${trafficId}`);
};

export const updateFavoriteTraffic = ({ trafficId, alias }) => {
  console.log(trafficId, alias);
  return trafficInstance.patch(`/favorite/${trafficId}`, {
    trafficAlias: alias,
  });
};
