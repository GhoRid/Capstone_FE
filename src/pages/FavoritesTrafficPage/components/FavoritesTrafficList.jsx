import React, { useState } from "react";
import styled from "styled-components";
import { motion, Reorder } from "framer-motion";
import FavoritesTrafficItem from "./FavoritesTrafficItem";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  position: relative;
`;

const FavoritesTrafficList = ({ favoritesTraffic }) => {
  // 순서변경
  // const [items, setItems] = useState(favoritesTraffic);

  return (
    <Container>
      {/* <Reorder.Group axis="y" values={items} onReorder={setItems}> */}
      {favoritesTraffic.data.data.traffics?.map((traffic) => (
        <FavoritesTrafficItem key={traffic.id} traffic={traffic} />
      ))}
    </Container>
  );
};

export default FavoritesTrafficList;
