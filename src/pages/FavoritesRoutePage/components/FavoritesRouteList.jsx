import React from "react";
import styled from "styled-components";
import FavoritesRouteItem from "./FavoritesRouteItem";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 56px);
`;

const FavoritesRouteList = ({ favoritesPath }) => {
  return (
    <Container>
      {favoritesPath.data.data.favoriteRoutes?.map((path) => (
        <FavoritesRouteItem key={path.id} path={path} />
      ))}
    </Container>
  );
};

export default FavoritesRouteList;
