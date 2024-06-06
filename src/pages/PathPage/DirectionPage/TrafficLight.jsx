import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TrafficLightContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 30px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 5px;
  background-color: #45413c;
`;

const Light = styled.div`
  width: 20px;
  height: 20px;
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
  font-size: 12.5px;
  text-indent: 0px;
  color: ${(props) =>
    props.state === "red"
      ? "red"
      : props.state === "green"
        ? "green"
        : "black"};
`;

const TrafficLight = ({ id, redCycle, greenCycle, color, timeLeft }) => {
  const [state, setState] = useState(color);
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => {
        if (time === 1) {
          setState((state) => {
            if (state === "red") {
              setTime(greenCycle);
              return "green";
            } else {
              setTime(redCycle);
              return "red";
            }
          });
        } else {
          return time - 1;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [redCycle, greenCycle]);

  return (
    <TrafficLightContainer>
      <Light color={state === "red" ? "red" : "#D9D9D9"} />
      <Light color={state === "green" ? "green" : "#D9D9D9"} />
      <Light color="#D9D9D9">
        <Time state={state}>{time}</Time>
      </Light>
    </TrafficLightContainer>
  );
};

export default TrafficLight;
