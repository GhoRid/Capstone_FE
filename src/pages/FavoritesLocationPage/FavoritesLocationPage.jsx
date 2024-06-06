import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import LocationEmptyPage from "./components/LocationEmptyPage";
import FavoritesLocationList from "./components/FavoritesLocationList";

const FavoritesLocationPage = () => {
  const locations = [
    {
      locationId: 1,
      locationAlias: "alias1",
    },
    {
      locationcId: 2,
      locationAlias: "alias2",
    },
    {
      locationId: 3,
      locationAlias: "alias3",
    },
  ];

  const EmptyList = locations.length === 0;
  return(
    <Layout>
      <Header>즐겨찾기 장소</Header>
      {EmptyList
       ? <LocationEmptyPage />
       : <FavoritesLocationList locations={locations} />
      }
    </Layout>
  );
}

export default FavoritesLocationPage;