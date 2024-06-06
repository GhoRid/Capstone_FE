import { pathInstance } from "..";

export const fetchPathDetail = (address) => {
  //console.log(address);
  return pathInstance.get("./detail");
};

export const fetchFavoritePath = () => {
  return pathInstance.get("/favorite");
};

export const addFavoritePath = () => {
  return pathInstance.post("/favorite");
};

export const fetchFavoritePathById = (trafficId) => {
  return pathInstance.get(`/favorite/${trafficId}`);
};

export const deleteFavoritePathById = (favoriteId) => {
  return pathInstance.delete(`/favorite/${favoriteId}`);
};

export const updateFavoritePathById = (favoriteId) => {
  return pathInstance.put(`/favorite/${favoriteId}`);
};
