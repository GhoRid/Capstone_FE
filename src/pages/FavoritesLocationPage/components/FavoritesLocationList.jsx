import React,{ useState } from "react";
import styled from "styled-components";
import { Reorder } from "framer-motion";
import FavoritesLocationItem from "./FavoritesLocationItem";

const Container = styled.div`
  width:100%;
  height:calc(100% - 56px);
  position:relative;
`;


const FavoritesLocationList = ({locations}) => {
  const [items, setItems] = useState(locations);

    return(
    <Container>
      <Reorder.Group axis="y" values={items} onReorder={setItems}>
        {items.map((location) => (
          <FavoritesLocationItem 
            key={location.locationId}
            location={location} />
        ))}
      </Reorder.Group>
    </Container>
  );
}

export default FavoritesLocationList;