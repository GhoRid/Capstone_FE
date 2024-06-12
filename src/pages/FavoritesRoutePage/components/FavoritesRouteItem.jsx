import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MoveButton from "../../../assets/icon/moveButton.webp";
import {
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import Icon from "../../../assets/icon/favoriteRouteIcon.webp";
import UpdateModal from "../../../components/UpdateModal";
import DeleteModal from "../../../components/DeleteModal";

const { kakao } = window;

const ListWrapper = styled.div`
  width: 100%;
  height: 65px;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
`;

const EditContainer = styled(motion.div)`
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid #f0f0f0;
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
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
`;

const ItemBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
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
  text-align: left;
`;

const Alias = styled.p`
  height: 30%;
  display: block;
  margin: 1px 0px;
`;

const RouteAlias = styled.span`
  font-size: 11px;
  color: #535ce8;
`;

const RouteBox = styled.div``;
const Start = styled.span`
  font-size: 15px;
`;
const End = styled.span`
  font-size: 15px;
`;
const Arrow = styled.span``;

const MoveBox = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Move = styled.img``;

const FavoritesRouteItem = ({ path }) => {
  const { id, name, startPoint, endPoint } = path;
  const dragControls = useDragControls();
  const [animateRef, animate] = useAnimate();
  const [currentDraggedItemId, setCurrentDraggedItemId] = useState(null);
  const itemX = useMotionValue(0);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const buttonAnimateState = isButtonShow ? "visible" : "hidden";
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");

  useEffect(() => {
    itemX.on("change", (v) => {
      const isOverThreshold = v < -55 / 2;
      setIsButtonShow(isOverThreshold);
    });
  });

  let geocoder = new kakao.maps.services.Geocoder();
  // 출발좌표값 주소로 변환
  const getStartAddress = (lat, lng) => {
    const startLatLng = new kakao.maps.LatLng(lat, lng);
    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setStartAddress(result[0].address.address_name);
      } else {
        console.error("Failed to get end address:", status);
      }
    };
    geocoder.coord2Address(
      startLatLng.getLng(),
      startLatLng.getLat(),
      callback
    );
  };

  // 도착좌표값 주소로 변환
  const getEndAddress = (lat, lng) => {
    const endLatLng = new kakao.maps.LatLng(lat, lng);
    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setEndAddress(result[0].address.address_name);
      } else {
        console.error("Failed to get end address:", status);
      }
    };
    geocoder.coord2Address(endLatLng.getLng(), endLatLng.getLat(), callback);
  };

  useEffect(() => {
    getStartAddress(startPoint.lat, startPoint.lng);
    getEndAddress(endPoint.lat, endPoint.lng);
  }, [startPoint, endPoint]);

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
        dragControls={dragControls}
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
            <Alias>
              <RouteAlias>{name}</RouteAlias>
            </Alias>
            <RouteBox>
              <Start>{startAddress}</Start>
              <Arrow> -{">"} </Arrow>
              <End>{endAddress}</End>
            </RouteBox>
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

export default FavoritesRouteItem;
