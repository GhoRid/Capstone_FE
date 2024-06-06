import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../assets/icon/arrow.svg";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  gap: 16px;
`;

const InputBox = styled.input`
  width: 300px;
  border: none;
  height: 44px;
  border-radius: 5px;
  background-color: white;
  text-align: left;
  padding-left: 15px;
  box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.3);
  &::placeholder {
    // 필요시 속성 추가
  }
  &:focus {
    outline: none; // 기본 테두리 스타일 제거
    border: 2px solid ${(props) => props.theme.blue}; // 테두리 스타일 설정
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const DirectionSearchButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.blue};
  display: block;
  box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.3);
`;

const DirectionSearchText = styled.p`
  font-size: 8px;
  color: white;
`;

const TopBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(inputValue); // 엔터 키를 눌렀을 때 입력한 텍스트 값 출력 -> 추후에 API 호출로 변경
    }
  };

  // const handleKeyPress = async (event) => {
  //   if (event.key === "Enter") {
  //     const places = await searchPlaces(inputValue);
  //     console.log(places); // 검색 결과를 콘솔에 로그
  //   }
  // };

  return (
    <Container>
      <InputBox
        type="text"
        placeholder="목적지를 입력해주세요"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        //onClick={() => {
        // console.log("목적지 입력창 클릭");
        //}}
      ></InputBox>
      <DirectionSearchButton
        onClick={() => {
          console.log("길찾기 페이지 이동");
        }}
      >
        <Link to="/path">
          <Arrow />
          <DirectionSearchText>길찾기</DirectionSearchText>
        </Link>
      </DirectionSearchButton>
    </Container>
  );
};

export default TopBar;
