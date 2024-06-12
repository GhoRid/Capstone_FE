import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Walking from "../../../assets/icon/Walking.webp";
import React, { useState, useEffect } from "react";
import TrafficDirection from "./TrafficDirection.jsx";
import { useRecoilState } from "recoil";
import { addressState } from "../../../recoil/addressState/atom";
import { pathInfoState } from "../../../recoil/pathInfoState/atom";
import { useQuery } from "@tanstack/react-query";
import { fetchPathDetail } from "../../../apis/api/paths";

const Container = styled.div`
  background-color: white;
  position: absolute;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  max-width: 390px;
  width: 95%;
  height: 180px;
  border-radius: 5px;
  border: 1.5px solid ${(props) => props.theme.blue};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Box1 = styled.div`
  text-indent: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 75%;
  gap: 10px;
  //background-color: red;
`;

const StartTimeBox = styled.div`
  color: ${(props) => props.theme.blue};
  font-weight: 600;
  font-size: 17px;
`;

const TimeBox = styled.div`
  color: black;
  font-weight: 700;
  font-size: 24px;
`;

const InfoBox = styled.div`
  color: ${(props) => props.theme.gray};
  font-weight: 500;
  font-size: 14px;
`;

const NavStartButton = styled.button`
  background-color: ${(props) => props.theme.blue};
  border: 1.5px solid ${(props) => props.theme.blue};
  display: flex;
  flex-direction: row;
  max-width: 390px;
  width: 100%;
  align-items: center;
  height: 25%;
  // line-height: 50px;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 17px;
  position: absolute;
  bottom: 0;
`;

const WalkingIcon = styled.img.attrs({
  src: Walking,
  alt: "Walking",
})`
  width: 20px;
  height: 30px;
  margin-right: 10px;
`;

const DirecrtionInfo = ({ onNavStartClick, pathResponse }) => {
  const [address, setAddress] = useRecoilState(addressState);
  const [pathInfo, setPathInfo] = useRecoilState(pathInfoState);

  const getSuggestedTime = () => {
    let currentTime = new Date();

    const timeLeftInSeconds = Math.round(pathResponse.timeToFirstTraffic); // -30 // -(n초)를 하면, 신호가 바뀌기 n초 전에 도착하도록 추천 출발 시간 설정 가능
    currentTime = new Date(currentTime.getTime() + timeLeftInSeconds * 1000);

    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    // const seconds = currentTime.getSeconds();
    const ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const sugegestedTime = `${ampm} ${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;
    return sugegestedTime;
  };

  const suggestedDepartureTime = getSuggestedTime();
  const timeTakes = Math.ceil(pathResponse.totalTime / 60);
  const trafficCounts = pathResponse.trafficCount;
  const totalDistance = pathResponse.totalDistance / 1000;

  useEffect(() => {
    setPathInfo(() => ({
      suggestedDepartureTime: suggestedDepartureTime,
      timeTakes: timeTakes,
      totalDistance: totalDistance,
      trafficCounts: trafficCounts,
    }));
  }, []);

  return (
    <Container>
      <Box1>
        <StartTimeBox>{pathInfo.suggestedDepartureTime} 출발</StartTimeBox>
        <TimeBox>{pathInfo.timeTakes}분</TimeBox>
        <InfoBox>
          {" "}
          {pathInfo.totalDistance}km | 횡단보도 {pathInfo.trafficCounts}회
        </InfoBox>
      </Box1>
      <NavStartButton onClick={onNavStartClick}>
        <WalkingIcon />
        안내시작
      </NavStartButton>
    </Container>
  );
};

export default DirecrtionInfo;
