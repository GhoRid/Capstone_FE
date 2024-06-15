import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TrafficLightContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  height: 36px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 5px;
  background-color: #45413c;
`;

const Light = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 20px;
  border: 1px solid black;
`;

const Time = styled.span`
  font-size: 13.5px;
  text-indent: 0px;
  color: ${(props) =>
    props.state === "RED"
      ? "red"
      : props.state === "GREEN"
        ? "green"
        : "black"};
`;

const TrafficLight = ({
  id,
  redCycle,
  greenCycle,
  color,
  timeLeft,
  direction,
}) => {
  const [state, setState] = useState(color);
  const [time, setTime] = useState(Math.round(timeLeft));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => {
        if (time === 1) {
          setState((state) => {
            if (state === "RED") {
              setTime(Math.round(greenCycle));
              return "GREEN";
            } else {
              setTime(Math.round(redCycle));
              return "RED";
            }
          });
        } else {
          return Math.round(time - 1);
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [redCycle, greenCycle]);

  return (
    <TrafficLightContainer>
      <Light color={state === "RED" ? "RED" : "#D9D9D9"} />
      <Light color={state === "GREEN" ? "GREEN" : "#D9D9D9"} />
      <Light color="#D9D9D9">
        <Time state={state}>{time}</Time>
      </Light>
    </TrafficLightContainer>
  );
};

export default TrafficLight;
