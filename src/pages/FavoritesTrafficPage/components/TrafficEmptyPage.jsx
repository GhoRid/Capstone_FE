import React from "react";
import styled from "styled-components";
import TrafficIcon from "../../../assets/icon/trafficGIcon.webp";

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
  width:29px;
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
          {/* <PiTrafficSignalLight
            size="64px" 
            color="#d9d9d9" /> */}
          <Icon src={TrafficIcon} alt="TrafficIcon" />
        </IconBox>
        <Title>즐겨찾기한 신호등이 없습니다.</Title>
        <Text>새로운 신호등을 추가해보세요!</Text>
      </EmptyPageInner>
    </Container>
  );
}

export default LocationEmptyPage;