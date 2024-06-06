import React from "react";
import styled from "styled-components";
import RouteIcon from "../../../assets/icon/routeGIcon.webp";

const Container = styled.div`
  width:100%;
  height: calc(100vh - 56px);
  position:relative;
`;

const EmptyPageInner = styled.div`
  width:100%;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
`;

const IconBox = styled.div`
  display:flex;
  justify-content:center;
`;

const Icon = styled.img`
  width:59px;
`;

const Title = styled.h3`
  font-size:16px;
  text-align:center;
  color:#666666;
  margin:10px 0px;
`;

const Text = styled.p`
  font-size:12px;
  text-align:center;
  color:#d9d9d9;
  margin:0;
`;

const LocationEmptyPage = () => {
  return(
    <Container>
      <EmptyPageInner>
        <IconBox>
          <Icon src={RouteIcon} alt="RouteIcon" />
        </IconBox>
        <Title>즐겨찾기한 경로가 없습니다.</Title>
        <Text>길찾기에서 새로운 경로를 추가해보세요!</Text>
      </EmptyPageInner>
    </Container>
  );
}

export default LocationEmptyPage;