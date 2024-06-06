import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import RouteEmptyPage from "./components/RouteEmptyPage";
import FavoritesRouteList from "./components/FavoritesRouteList";

const FavoritesRoutePage = () => {
  const routes = [
    {
        routeId : 1,
        name : "경로1",
        startName : "출발지1",
        endName : "도착지1",
    },
    {
        routeId : 2,
        name : null,
        startName : "출발지2",
        endName : "도착지2",
    },
    
  ];

  const EmptyList = routes.length === 0;
  return(
    <Layout>
      <Header>즐겨찾기 경로</Header>
      {EmptyList
       ? <RouteEmptyPage />
       : <FavoritesRouteList routes={routes} />
      }
    </Layout>
  );
}

export default FavoritesRoutePage;