import { motion, useDragControls } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import { fetchPathDetail } from "../../../apis/api/paths";
import { useRecoilState, useRecoilValue } from "recoil";
import { pathInfoState } from "../../../recoil/pathInfoState/atom";
import { addressState } from "../../../recoil/addressState/atom";
import TrafficLight from "../../../components/TrafficLight";

const Container = styled(motion.div)`
  //bottom: 0;
  width: 100%;
  height: 100dvh;
  background-color: white;
  position: absolute;
  z-index: 1000;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.2);
`;

const Box1 = styled.div`
  text-indent: 20px;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
  width: 100%;
  height: 15%;
  margin-top: 16px;
  left: 0;
  gap: 10px;
  //background-color: red;
  border-bottom: 1px solid ${(props) => props.theme.gray};
`;

const Box2 = styled.div`
  text-indent: 20px;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
  width: 100%;
  height: 7%;
  //margin-top: 35%;
  top: calc(15% + 15px);
  left: 0;
  font-weight: 600;
  //gap: 10px;
  //background-color: blue;
  border-bottom: 1px solid ${(props) => props.theme.gray};
`;

const Box3 = styled.div`
  text-indent: 20px;
  display: flex;
  position: absolute;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;
  width: 100%;
  height: 45%;
  margin-top: 10px;
  top: calc(22% + 14px);
  left: 0;
  font-weight: 600;
  //gap: 10px;
  //background-color: green;
  //border-bottom: 1px solid ${(props) => props.theme.gray};
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 68px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HandleBar = styled.div`
  width: 78px;
  height: 2px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.gray};
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

const TrafficLightsListBox = styled.div`
  display: flex;
  flex-direction: column;
  //background-color: gray;
  padding: 0 10px;
  overflow-y: auto;
`;

const TrafficLightsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 50px;
  text-indent: 0;
  color: ${(props) => props.theme.blue};
  //border-bottom: 2px solid ${(props) => props.theme.gray};
`;

const TrafficLightContainer = styled.div`
  //margin-left: auto;
`;

const NumberingIcon = styled.div`
  display: flex;
  justify-content: center;
  text-indent: 0px;
  align-items: center;
  color: white;
  background-color: ${(props) => props.theme.blue};
  border-radius: 50%;
  margin-left: 10px;
  width: 30px;
  height: 30px;
`;

const NoTrafficLights = styled.div`
  height: 125px;
  //background-color: green;
  display: flex;
  color: ${(props) => props.theme.gray};
  flex-direction: column;
  justify-content: center;
  text-indent: 0px;
  line-height: 125px;
  align-items: center;
`;

const Direction = styled.div`
  //background-color: green;
  //margin-right: auto;
  margin-left: auto;
  color: black;
  // align-items: center;
`;

const TrafficDirection = (trafficLightsDT) => {
  const dragControls = useDragControls();
  const [openState, setOpenState] = useState("mid");
  const pathInfo = useRecoilValue(pathInfoState);
  const [address, setAddress] = useRecoilState(addressState);
  const { startLat, startLng, endLat, endLng } = address;
  const [trafficLights, setTrafficLights] = useState(
    trafficLightsDT.trafficLightsDT
  );

  // trafficLights가 변경될 때마다 trafficLights 상태를 업데이트
  useEffect(() => {
    setTrafficLights(trafficLightsDT.trafficLightsDT);
  }, [trafficLightsDT.trafficLightsDT]);
  //console.log("TrafficDirection 정보: " + trafficLights);

  return (
    <Container
      $favoritesInfoOpenState={openState}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      initial={openState}
      animate={openState}
      variants={{
        top: { top: `20dvh` },
        mid: { top: `50dvh` },
        closed: { top: `calc(100dvh - 100px)` },
      }}
      transition={{ duration: 0.3 }}
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0.2}
      onDragEnd={(event, info) => {
        const offsetThreshold = 100;
        const deltaThreshold = 2;

        const isOverOffsetThreshold = Math.abs(info.offset.y) > offsetThreshold;
        const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;

        const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;

        if (!isOverThreshold) return;

        const isGoDown = info.offset.y > 0;

        if (isGoDown && openState === "top") {
          setOpenState("mid");
        } else if (isGoDown && openState === "mid") {
          setOpenState("closed");
        } else if (!isGoDown && openState === "mid") {
          setOpenState("top");
        } else if (!isGoDown && openState === "closed") {
          setOpenState("mid");
        }
      }}
    >
      <HeaderBox onPointerDown={(e) => dragControls.start(e)}>
        <HandleBar />
        <Box1>
          <StartTimeBox>{pathInfo.suggestedDepartureTime} 출발</StartTimeBox>
          <TimeBox>{pathInfo.timeTakes}분</TimeBox>
          <InfoBox>
            {pathInfo.totalDistance}km | 횡단보도 {pathInfo.trafficCounts}회
          </InfoBox>
        </Box1>
        <Box2>신호등 정보</Box2>
        <Box3>
          <TrafficLightsListBox>
            {trafficLights.length > 0 ? (
              trafficLights.map((trafficLight, index) => (
                <TrafficLightsItem key={index}>
                  <NumberingIcon>{index + 1}</NumberingIcon>
                  {trafficLight.id}
                  <Direction>
                    {trafficLight.direction === "et"
                      ? "동쪽"
                      : trafficLight.direction === "wt"
                      ? "서쪽"
                      : trafficLight.direction === "sw"
                      ? "남쪽"
                      : trafficLight.direction === "nt"
                      ? "북쪽"
                      : trafficLight.direction}{" "}
                  </Direction>
                  <TrafficLightContainer>
                    <TrafficLight
                      key={index}
                      id={trafficLight.id}
                      redCycle={trafficLight.redCycle}
                      greenCycle={trafficLight.greenCycle}
                      color={trafficLight.color}
                      timeLeft={trafficLight.timeLeft}
                      direction={trafficLight.direction}
                    />
                  </TrafficLightContainer>
                </TrafficLightsItem>
              ))
            ) : (
              <NoTrafficLights>
                {" "}
                해당 지역은 추후 서비스 예정입니다...
              </NoTrafficLights>
            )}
          </TrafficLightsListBox>
        </Box3>
      </HeaderBox>
    </Container>
  );
};

export default TrafficDirection;
