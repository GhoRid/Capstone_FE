import styled from "styled-components";
import crossIcon from "../../assets/icon/cross.webp";
import backwardIcon from "../../assets/icon/backwardIcon.webp";
import pinIcon from "../../assets/icon/pinIcon.webp";
import pantoIcon from "../../assets/icon/pantoIcon.webp";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ReactComponent as Arrow } from "../../assets/icon/arrow.svg";
import { useRecoilState } from "recoil";
import { addressState } from "../../recoil/addressState/atom";
import { useQuery } from "@tanstack/react-query";
import { fetchPathDetail } from "../../apis/api/paths";

const MainContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //background-color: green;
  gap: 5px;
  //border-bottom: 2px solid ${(props) => props.theme.gray};
`;

const InputBox1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  color: ${(props) => props.theme.gray};
  height: 40px;
  //background-color: blue;
  //padding: 0 0px; // 상하 여백 0, 좌우 여백 10px
  //flex: 9;
`;
const InputBox2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  color: gray;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  gap: 10px;
  //background-color: blue;
  //padding: 0 0px; // 상하 여백 0, 좌우 여백 10px
  //flex: 9;
`;

const InputButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  //padding: 15px;
  text-indent: 10px;
  height: 40px;
  margin-left: 20px;
  //margin-top: 10px;
  //margin-bottom: 10px;
  text-align: left;
  width: 80%;
  border-radius: 3px;
  color: black;
  &:focus {
    outline: none; // 기본 테두리 스타일 제거
    border: 2px solid ${(props) => props.theme.blue}; // 테두리 스타일 설정
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const CloseButton = styled.button`
  background-image: url(${crossIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  width: 50px;
  height: 50px;
`;
const BackwardButton = styled.button`
  background-image: url(${backwardIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  margin-left: 10px;
  width: 25px;
  height: 25px;
`;

const CurrentLocation = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  color: gray;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  gap: 10px;
`;

const PantoButton = styled.img.attrs({
  src: pantoIcon,
  alt: "pantoIcon",
})`
  margin-left: 40px;
  width: 25px;
  height: 25px;
`;

const SelectFromMap = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  color: gray;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  gap: 10px;
`;

const PinButton = styled.img.attrs({
  src: pinIcon,
  alt: "pinIcon",
})`
  width: 25px; // Adjust as needed
  height: 25px; // Adjust as needed
`;

const DirectionSearchButton = styled.button`
  width: 33px;
  height: 37px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.blue};
  display: block;
  box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.3);
`;

const DirectionSearchText = styled.p`
  font-size: 6px;
  color: white;
`;

const SearchingBar = () => {
  const [isDepartureInputClicked, setDepartureInputClicked] = useState(false);
  const [isArrivalInputClicked, setArrivalInputClicked] = useState(false);
  const navigate = useNavigate();
  // const [departureInput, setDepartureInput] = useRecoilState(addressState);
  // const [arrivalInput, setArrivalInput] = useRecoilState(addressState);
  const [address, setAddress] = useRecoilState(addressState);
  //console.log(!!departureAddress.departureAddress);
  // const [arrivalAddress, setArrivalAddress] =
  //   useRecoilState(arrivalAddressState);
  const { startLat, startLng, endLat, endLng } = address;

  const handleDepartureInputClick = () => {
    setDepartureInputClicked(true);
  };

  const handleArrivalInputClick = () => {
    setArrivalInputClicked(true);
  };

  const handleBackwardButtonClick = (event) => {
    event.stopPropagation();
    if (isDepartureInputClicked) {
      setDepartureInputClicked(false); // 출발지 버튼 클릭 상태 0으로 함
    }
    if (isArrivalInputClicked) {
      setArrivalInputClicked(false); // 도착지 버튼 클릭 상태 0으로 함
    }
  };

  const handleInputChange = (event) => {
    if (isDepartureInputClicked) {
      setAddress((prev) => ({
        ...prev,
        departureAddress: event.target.value,
      }));
      //({ departureAddress: event.target.value });
    }
    if (isArrivalInputClicked) {
      setAddress((prev) => ({
        ...prev,
        arrivalAddress: event.target.value,
      }));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (isDepartureInputClicked) {
        console.log("출발지: " + address.departureAddress);
        console.log("isDepartureInputClicked: " + isDepartureInputClicked);
        console.log("isArrivalInputClicked: " + isArrivalInputClicked);
      }
      if (isArrivalInputClicked) {
        console.log("도착지: " + address.arrivalAddress);
        console.log("isDepartureInputClicked: " + isDepartureInputClicked);
        console.log("isArrivalInputClicked: " + isArrivalInputClicked);
      }
    }
  };

  const handleCurrentLocationClick = () => {
    console.log("현재 위치 클릭");
    if (isDepartureInputClicked) {
      setAddress((prev) => ({
        ...prev,
        departureAddress: "", // 현재 위치 주소 받아오는 코드로 변경
      }));
    }
    if (isArrivalInputClicked) {
      setAddress((prev) => ({
        ...prev,
        arrivalAddress: "", // 현재 위치 주소 받아오는 코드로 변경
      }));
    }
  };

  const {
    isLoading,
    data: pathDetailData, // 수정
    refetch: pathDetailRefetch, // 수정
  } = useQuery({
    queryKey: ["pathDetail", startLat, startLng, endLat, endLng],
    queryFn: () => fetchPathDetail(startLat, startLng, endLat, endLng),
    enabled: !!address, // 수정
    // keepPreviousData: true,
    // staleTime: 5000,
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <MainContainer>
      <InputBox1>
        {isDepartureInputClicked === false &&
        isArrivalInputClicked === false ? (
          <>
            <InputButton onClick={handleDepartureInputClick}>
              {address.departureAddress !== "" ? (
                address.departureAddress
              ) : (
                <span style={{ color: "gray" }}>출발지 입력</span>
              )}
            </InputButton>
            <Link to="/">
              <CloseButton />
            </Link>
          </>
        ) : null}

        {isDepartureInputClicked ? (
          <>
            <InputButton
              as="input"
              type="text"
              //placeholder="출발지 입력"
              value={address.departureAddress}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <BackwardButton onClick={handleBackwardButtonClick} />
          </>
        ) : null}
        {isArrivalInputClicked ? (
          <>
            <InputButton
              as="input"
              type="text"
              //placeholder="도착지 입력"
              value={address.arrivalAddress}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <BackwardButton onClick={handleBackwardButtonClick} />
          </>
        ) : null}
      </InputBox1>
      <InputBox2>
        {isDepartureInputClicked === false &&
        isArrivalInputClicked === false ? (
          <>
            <InputButton onClick={handleArrivalInputClick}>
              {address.arrivalAddress !== "" ? (
                address.arrivalAddress
              ) : (
                <span style={{ color: "gray" }}>도착지 입력</span>
              )}
            </InputButton>
            <DirectionSearchButton
              onClick={() => {
                // console.log("출발지 위도: " + address.startLat);
                // console.log("출발지 경도: " + address.startLng);
                // console.log("도착지 위도: " + address.endLat);
                // console.log("도착지 경도: " + address.endLng);
                pathDetailRefetch();
                // api로 출발지 및 도착지 위도 경도 전송
                navigate("/direction");
              }}
            >
              <Arrow />
              <DirectionSearchText>길찾기</DirectionSearchText>
            </DirectionSearchButton>
          </>
        ) : null}
        {isDepartureInputClicked ? (
          <>
            <CurrentLocation onClick={handleCurrentLocationClick}>
              <PantoButton />
              <span style={{ marginRight: "40px" }}>현재 위치</span>
            </CurrentLocation>
            <SelectFromMap
              onClick={() => {
                navigate("/pathsearch", {
                  state: {
                    isDepartureInputClicked: isDepartureInputClicked,
                    isArrivalInputClicked: isArrivalInputClicked,
                  },
                });
              }}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <PinButton />
              <span>지도에서 선택</span>
            </SelectFromMap>
          </>
        ) : null}
        {isArrivalInputClicked ? (
          <>
            <CurrentLocation onClick={handleCurrentLocationClick}>
              <PantoButton />
              <span style={{ marginRight: "40px" }}>현재 위치</span>
            </CurrentLocation>
            <SelectFromMap
              onClick={() => {
                navigate("/pathsearch", {
                  state: {
                    isDepartureInputClicked: isDepartureInputClicked,
                    isArrivalInputClicked: isArrivalInputClicked,
                  },
                });
              }}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <PinButton />
              <span>지도에서 선택</span>
            </SelectFromMap>
          </>
        ) : null}
      </InputBox2>
    </MainContainer>
  );
};

export default SearchingBar;
