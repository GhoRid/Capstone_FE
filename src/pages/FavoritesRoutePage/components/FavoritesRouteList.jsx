import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import FavoritesRouteItem from "./FavoritesRouteItem";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 56px);
`;

const FavoritesRouteList = ({ routes }) => {
  return (
    <Container>
      {routes.map((route, index) => (
        <FavoritesRouteItem route={route} />
      ))}
    </Container>
  );
};

export default FavoritesRouteList;
