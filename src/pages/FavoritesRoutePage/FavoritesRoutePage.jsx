import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import RouteEmptyPage from "./components/RouteEmptyPage";
import FavoritesRouteList from "./components/FavoritesRouteList";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoritePath } from "../../apis/api/paths";

const FavoritesRoutePage = ({ mapAddress }) => {
  const { isLoading: pathIsLoading, data: favoritesPath } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavoritePath,
    onError: (e) => {
      console.log(e);
    },
  });

  if (pathIsLoading) return;

  return (
    <Layout>
      <Header>즐겨찾기 경로</Header>
      {favoritesPath.length === 0 ? (
        <RouteEmptyPage />
      ) : (
        <FavoritesRouteList favoritesPath={favoritesPath} />
      )}
    </Layout>
  );
};

export default FavoritesRoutePage;
