import { styled } from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import locationIcon from "../../../assets/icon/location.png";
import startingPoint from "../../../assets/icon/startingPoint.webp";
import endingPoint from "../../../assets/icon/endingPoint.webp";
import NavigationBarLayout from "../../../components/NavigationBarLayout";
import SearchingBar from "../SearchingBar";
import DirectionInfo from "./DirectionInfo";
import TrafficDirection from "./TrafficDirection";
import { useQuery } from "@tanstack/react-query";
import { fetchPathDetail } from "../../../apis/api/paths";
import { useRecoilState } from "recoil";
import { addressState } from "../../../recoil/addressState/atom";

const { kakao } = window;

const Container = styled.div``;

const PanToButton = styled.button`
  position: absolute;

  right: 10px;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 500;
  font-size: 20px;
  transition: bottom 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DirectionPage = () => {
  const [map, setMap] = useState(null);
  const [state, setState] = useState({
    center: {
      lat: 35.17828963,
      lng: 126.909254315,
    },
    errMsg: null,
    isLoading: true,
  });
  const [address, setAddress] = useRecoilState(addressState);
  const [showTrafficDirection, setShowTrafficDirection] = useState(false);
  const [panToBottom, setPanToBottom] = useState(290);
  const { startLat, startLng, endLat, endLng } = address;

  const handleNavStartClick = () => {
    setShowTrafficDirection(true);
    setPanToBottom(120);
  };

  const panTo = () => {
    const newLatLng = new kakao.maps.LatLng(state.center.lat, state.center.lng);
    map.panTo(newLatLng);
  };

  const {
    isLoading,
    data: pathDetailData,
    refetch: pathDetailRefetch,
  } = useQuery({
    queryKey: ["pathDetail", startLat, startLng, endLat, endLng],
    queryFn: () => fetchPathDetail({ startLat, startLng, endLat, endLng }),
    enabled: !!address,
    onError: (e) => {
      console.log(e);
    },
  });

  const pathResponse = pathDetailData?.data.data;
  console.log(pathResponse);

  const linePath = pathDetailData?.data.data.paths.map((path) => {
    return new kakao.maps.LatLng(path.lat, path.lng);
  });

  const polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#535CE8", // 선의 색깔입니다
    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  });

  polyline.setMap(map);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없음",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <NavigationBarLayout>
      <Container>
        <SearchingBar />
        <Map
          id="map"
          center={state.center}
          style={{
            width: "100%",
            height: "calc(100dvh - 180px)",
          }}
          padding={64}
          level={4}
          minLevel={6}
          onCreate={setMap}
          onDragEnd={(map) => {}}
        >
          {pathResponse && (
            <>
              <MapMarker
                position={pathResponse.startPoint}
                image={{ src: startingPoint, size: { width: 45, height: 60 } }}
                key="startPoint"
              />
              <MapMarker
                position={pathResponse.endPoint}
                image={{ src: endingPoint, size: { width: 45, height: 60 } }}
                key="endPoint"
              ></MapMarker>
            </>
          )}
        </Map>
        <PanToButton
          style={{ bottom: `${panToBottom}px` }}
          onClick={() => {
            panTo();
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="9" r="8.5" stroke="black" />
            <path
              d="M9.5 1V0.5H8.5V1H9.5ZM8.5 3C8.5 3.27614 8.72386 3.5 9 3.5C9.27614 3.5 9.5 3.27614 9.5 3H8.5ZM8.5 1V3H9.5V1H8.5Z"
              fill="black"
            />
            <path
              d="M1 8.5H0.5V9.5H1V8.5ZM3 9.5C3.27614 9.5 3.5 9.27614 3.5 9C3.5 8.72386 3.27614 8.5 3 8.5V9.5ZM1 9.5H3V8.5H1V9.5Z"
              fill="black"
            />
            <path
              d="M9.5 15C9.5 14.7239 9.27614 14.5 9 14.5C8.72386 14.5 8.5 14.7239 8.5 15H9.5ZM8.5 17V17.5H9.5V17H8.5ZM8.5 15V17H9.5V15H8.5Z"
              fill="black"
            />
            <path
              d="M15 8.5C14.7239 8.5 14.5 8.72386 14.5 9C14.5 9.27614 14.7239 9.5 15 9.5V8.5ZM17 9.5H17.5V8.5H17V9.5ZM15 9.5H17V8.5H15V9.5Z"
              fill="black"
            />
            <circle cx="9" cy="9" r="1" fill="black" />
          </svg>
        </PanToButton>
      </Container>

      <DirectionInfo
        onNavStartClick={handleNavStartClick}
        pathResponse={pathResponse}
      />

      {showTrafficDirection && <TrafficDirection />}
    </NavigationBarLayout>
  );
};

export default DirectionPage;
