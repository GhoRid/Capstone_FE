import { useMutation } from "@tanstack/react-query";
import { addFavoriteTraffic, deleteFavoriteTraffic } from "../apis/api/traffic";

export const useHandleFavoriteTraffic = ({
  id = "",
  viewName = "",
  isFavorite,
}) => {
  const token = localStorage.getItem("token");
  const { mutate: handleFavoriteMutate } = useMutation({
    mutationFn: ({ id, viewName }) =>
      isFavorite
        ? deleteFavoriteTraffic(id)
        : addFavoriteTraffic({ trafficId: id, trafficAlias: viewName }),
    onSuccess: (res) => {
      console.log("즐겨찾기", res);
    },
    onError: (e) => {
      console.log("즐겨찾기 에러:", e);
    },
  });

  const handleFavorite = () => {
    if (!token) {
      console.log("로그인이 필요합니다.");
      return;
    }

    handleFavoriteMutate({ id, viewName });
  };

  return handleFavorite;
};
