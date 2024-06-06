import { trafficInstance } from "..";

export const fetchTraffic = (mapBounds) => {
  const { ha, oa, pa, qa } = mapBounds;
  return trafficInstance.get("", {
    params: {
      vblLat: qa,
      vblLng: ha,
      vtrLat: pa,
      vtrLng: oa,
    },
  });
};

export const fetchFavoriteTraffic = () => {
  return trafficInstance.get("/favorite");
};

export const addFavoriteTraffic = (payload) => {
  return trafficInstance.post("/favorite", payload);
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
