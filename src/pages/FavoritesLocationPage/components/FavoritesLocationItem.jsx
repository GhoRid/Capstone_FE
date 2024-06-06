import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MoveButton from "../../../assets/icon/moveButton.webp";
import {
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
  Reorder,
} from "framer-motion";
import Icon from "../../../assets/icon/favoritePlaceIcon.webp";
import UpdateModal from "../../../components/UpdateModal";

const ListWrapper = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
`;

const EditContainer = styled(motion.div)`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
`;
const UpdateButton = styled.button`
  width: 55px;
  height: 100%;
  background-color: #535ce8;
  border: none;
  color: #fff;
  font-size: 11px;
  text-align: center;
  letter-spacing: -1px;
`;
const DeleteButton = styled.button`
  width: 55px;
  height: 100%;
  background-color: #f44336;
  border: none;
  color: #fff;
  font-size: 11px;
  text-align: center;
  letter-spacing: -1px;
`;

const SwipeContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  position: relative;
`;

const ListItemInner = styled(Reorder.Item)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background-color: #fff;
`;

const ItemBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background-color: #fff;
`;

const IconBox = styled.div`
  width: 32px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImg = styled.img`
  width: 30px;
`;

const AliasBox = styled.div`
  width: calc(100% - 60px);
  height: 100%;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TrafficAlias = styled.span`
  font-size: 15px;
`;

const MoveBox = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Move = styled.img``;

const FavoritesLocationItem = ({ location }) => {
  const { locationId, locationAlias } = location;
  const swipeDragControls = useDragControls();
  const reorderDragControls = useDragControls();
  const [animateRef, animate] = useAnimate();
  const [currentDraggedItemId, setCurrentDraggedItemId] = useState(null);
  const itemX = useMotionValue(0);
  useEffect(() => {
    itemX.on("change", (v) => {
      const isOverThreshold = v < -55 / 2;
      setIsButtonShow(isOverThreshold);
    });
  });

  const [isButtonShow, setIsButtonShow] = useState(false);
  const buttonAnimateState = isButtonShow ? "visible" : "hidden";

  const [isOpen, setIsOpen] = useState(false);
  const handleEditModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <ListWrapper>
        <EditContainer
          initial="hidden"
          animate={buttonAnimateState}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          <UpdateButton onClick={handleEditModal}>수정</UpdateButton>
          <DeleteButton
            onClick={() => {
              console.log("삭제 ");
            }}
          >
            삭제
          </DeleteButton>
        </EditContainer>
        <SwipeContainer
          key={locationId}
          drag="x"
          dragConstraints={{ left: -110, right: 0 }}
          dragElastic={0.1}
          dragControls={swipeDragControls}
          style={{ x: itemX }}
          onDragStart={() => {
            setCurrentDraggedItemId(locationId); // 현재 드래그 요소 추적
          }}
          onDragEnd={() => {
            if (currentDraggedItemId === locationId) {
              const isOverThreshold = itemX.get() < -55 / 2; // editbutton 반쯤 나올 때 버튼 다 보여주기
              animate(animateRef.current, { x: isOverThreshold ? -110 : 0 });
            }
            setCurrentDraggedItemId(null);
          }}
          ref={animateRef}
        >
          <ListItemInner
            id={location.id}
            value={location}
            dragControls={reorderDragControls}
            dragListener={false}
          >
            <ItemBox
              onClick={() => console.log("클릭")}
              onPointerDown={(e) => swipeDragControls.start(e)}
            >
              <IconBox>
                <IconImg src={Icon} alt="icon" />
              </IconBox>
              <AliasBox>
                <TrafficAlias>{locationAlias}</TrafficAlias>
              </AliasBox>
            </ItemBox>
            <MoveBox onPointerDown={(e) => reorderDragControls.start(e)}>
              <Move src={MoveButton} alt="move" />
            </MoveBox>
          </ListItemInner>
        </SwipeContainer>
      </ListWrapper>
      <UpdateModal
        isOpen={isOpen}
        onRequestClose={handleEditModal}
        location={location}
      />
    </>
  );
};

export default FavoritesLocationItem;
