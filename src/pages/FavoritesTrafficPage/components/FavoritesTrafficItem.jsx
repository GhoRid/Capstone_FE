import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MoveButton from "../../../assets/icon/moveButton.webp";
import {
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import UpdateModal from "../../../components/UpdateModal";
import Icon from "../../../assets/icon/favoriteLightIcon.png";
import DeleteModal from "../../../components/DeleteModal";

const ListWrapper = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
`;

const EditContainer = styled(motion.div)`
  width: 100%;
  height: 60px;
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
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 0px 12px;
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

const FavoritesTrafficItem = ({ traffic }) => {
  const { id, name } = traffic;
  const swipeDragControls = useDragControls();
  const [animateRef, animate] = useAnimate();
  const [currentDraggedItemId, setCurrentDraggedItemId] = useState(null);
  const itemX = useMotionValue(0);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const buttonAnimateState = isButtonShow ? "visible" : "hidden";
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    itemX.on("change", (v) => {
      const isOverThreshold = v < -55 / 2;
      setIsButtonShow(isOverThreshold);
    });
  });

  const handleEditUpdateModal = () => {
    setIsUpdateModalOpen((prev) => !prev);
  };
  const handleEditDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  return (
    <ListWrapper>
      <EditContainer
        initial="hidden"
        animate={buttonAnimateState}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      >
        <UpdateButton onClick={handleEditUpdateModal}>수정</UpdateButton>
        <DeleteButton onClick={handleEditDeleteModal}>삭제</DeleteButton>
      </EditContainer>
      <SwipeContainer
        key={id}
        drag="x"
        dragConstraints={{ left: -110, right: 0 }}
        dragElastic={0.1}
        dragControls={swipeDragControls}
        style={{ x: itemX }}
        onDragStart={() => {
          setCurrentDraggedItemId(id); // 현재 드래그 요소 추적
        }}
        onDragEnd={() => {
          if (currentDraggedItemId === id) {
            const isOverThreshold = itemX.get() < -55 / 2; // editbutton 반쯤 나올 때 버튼 다 보여주기
            animate(animateRef.current, { x: isOverThreshold ? -110 : 0 });
          }
          setCurrentDraggedItemId(null);
        }}
        ref={animateRef}
      >
        <ItemBox>
          <IconBox>
            <IconImg src={Icon} alt="icon" />
          </IconBox>
          <AliasBox>
            <TrafficAlias>{name}</TrafficAlias>
          </AliasBox>
        </ItemBox>
        <MoveBox>
          <Move src={MoveButton} alt="move" />
        </MoveBox>
      </SwipeContainer>
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onRequestClose={handleEditUpdateModal}
        id={id}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleEditDeleteModal}
        id={id}
      />
    </ListWrapper>
  );
};

export default FavoritesTrafficItem;
