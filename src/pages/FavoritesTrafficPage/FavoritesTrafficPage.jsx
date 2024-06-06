import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import TrafficEmptyPage from "./components/TrafficEmptyPage";
import FavoritesTrafficList from "./components/FavoritesTrafficList";
import { fetchFavoriteTraffic } from "../../apis/api/traffic";
import { useQuery } from "@tanstack/react-query";

const FavoritesTrafficPage = () => {
  const { isLoading, data: favoritesTraffic } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavoriteTraffic,
    onError: (e) => {
      console.log(e);
    },
  });

  if (isLoading) return;

  return (
    <Layout>
      <Header>즐겨찾기 신호등</Header>
      {favoritesTraffic.length === 0 ? (
        <TrafficEmptyPage />
      ) : (
        <FavoritesTrafficList favoritesTraffic={favoritesTraffic} />
      )}
    </Layout>
  );
};

export default FavoritesTrafficPage;
