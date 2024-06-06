import { useMutation } from "@tanstack/react-query";
import { addFavoriteTraffic, deleteFavoriteTraffic } from "../apis/api/traffic";

export const useHandleFavoriteTraffic = ({
  id = "",
  viewName = "",
  isFavorite,
}) => {
  const { mutate: handleFavoriteMutate } = useMutation({
    mutationFn: ({ id, viewName }) =>
      isFavorite
        ? deleteFavoriteTraffic(id)
        : addFavoriteTraffic({ id, viewName }),
    onSuccess: (res) => {
      console.log("즐겨찾기", res);
    },
    onError: (e) => {
      console.log("즐겨찾기 에러:", e);
    },
  });

  const isLoggedIn = !!localStorage.getItem("kakaoLoginToken");

  const handleFavorite = () => {
    if (!isLoggedIn) {
      console.log("로그인이 필요합니다.");
      return;
    }

    handleFavoriteMutate({ id, viewName });
  };

  return handleFavorite;
};
