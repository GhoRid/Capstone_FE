import React from "react";
import styled from "styled-components";
import FavoritesTrafficItem from "./FavoritesTrafficItem";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  position: relative;
`;

const FavoritesTrafficList = ({ favoritesTraffic }) => {
  return (
    <Container>
      {favoritesTraffic.data.data.traffics?.map((traffic) => (
        <FavoritesTrafficItem key={traffic.id} traffic={traffic} />
      ))}
    </Container>
  );
};

export default FavoritesTrafficList;
