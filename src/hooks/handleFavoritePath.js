import { useMutation } from "@tanstack/react-query";
import { addFavoritePath, deleteFavoritePathById } from "../apis/api/paths";
export const useHandleFavoritePath = ({
  id = "",
  viewName = "",
  isFavorite,
  pathInfo,
}) => {
  const { name, startName, startLat, startLng, endName, endLat, endLng } =
    pathInfo;

  const { mutate: handleFavoriteMutate } = useMutation({
    mutationFn: ({
      id,
      name,
      startName,
      startLat,
      startLng,
      endName,
      endLat,
      endLng,
    }) =>
      isFavorite
        ? deleteFavoritePathById(id)
        : addFavoritePath({
            name,
            startName,
            startLat,
            startLng,
            endName,
            endLat,
            endLng,
          }),
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
