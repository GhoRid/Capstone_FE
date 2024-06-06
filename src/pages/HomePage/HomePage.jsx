import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import NavigationBarLayout from "../../components/NavigationBarLayout";
import SurroundingLightInfo from "./componenets/SurroundingLightInfo";
import LightDetailInfo from "./componenets/LightDetailInfo";
import FavoriteInfo from "./componenets/FavoriteInfo";
import CustomOverLay from "./componenets/CustomOverLay";
import TopBar from "./componenets/TopBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { bottomSheetOpenState } from "../../recoil/bottomSheetOpenState/atom";
import { navigationState } from "../../recoil/navigationState/atom";
import { fetchTraffic } from "../../apis/api/traffic";
import locationIcon from "../..//assets/icon/location.png";
import { roundCoordinates } from "../../utils/roundCoordinates";

const { kakao } = window;

const Container = styled.div`
  position: relative;
`;

const PanToButton = styled.button`
  position: absolute;
  bottom: ${({ $openState, $navigationBarState }) =>
    ($openState.detailInfoOpenState.openState === "closed" &&
      $navigationBarState === "Home") ||
    ($openState.surroundingLightInfoOpenState === "closed" &&
      $navigationBarState === "TrafficSignal") ||
    ($openState.favoritesInfoOpenState === "closed" &&
      $navigationBarState === "Favorites") ||
    $navigationBarState === "MyPage"
      ? "4dvh"
      : "42dvh"};
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

const HomePage = () => {
  const navigationBarState = useRecoilValue(navigationState);
  const [openState, setOpenState] = useRecoilState(bottomSheetOpenState);
  const isLoggein = !!localStorage.getItem("token");

  const [map, setMap] = useState(null);
  const [mapBounds, setMapBounds] = useState(map?.getBounds());
  const [openIndex, setOpenIndex] = useState(null);
  const [state, setState] = useState({
    center: {
      lat: 35.17828963,
      lng: 126.909254315,
    },
    errMsg: null,
    isLoading: true,
  });

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const {
    isLoading,
    data: surroundingLightInfoData,
    refetch: surroundingDataRefetch,
  } = useQuery({
    queryKey: ["traffic"],
    queryFn: () => fetchTraffic(roundCoordinates(mapBounds)),
    onError: (e) => {
      console.log(e);
    },
  });

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

  useEffect(() => {
    if (navigationBarState === "TrafficSignal") {
      setOpenState((prev) => ({
        ...prev,
        surroundingLightInfoOpenState: "mid",
      }));
    } else if (navigationBarState === "Favorites") {
      setOpenState((prev) => ({ ...prev, favoritesInfoOpenState: "mid" }));
    }
  }, [navigationBarState]);

  const panTo = (point) => {
    const lat = point.lat ? point.lat : state.center.lat;
    const lng = point.lng ? point.lng : state.center.lng;
    const newLatLng = new kakao.maps.LatLng(lat, lng);
    map.panTo(newLatLng);
  };

  const handleMapDragEnd = () => {
    const newBounds = map.getBounds(); // 맵 API로부터 새로운 bounds 정보를 가져옴
    setMapBounds(newBounds);
    surroundingDataRefetch(); // 새로운 bounds로 데이터 페칭 실행
  };

  return (
    <NavigationBarLayout>
      <Container>
        <TopBar />
        <Map
          id="map"
          center={state.center}
          style={{
            width: "100%",
            height: "calc(100vh - 80px)",
          }}
          padding={64}
          level={3}
          minLevel={4}
          onCreate={setMap}
          onDragEnd={() => {
            handleMapDragEnd();
          }}
          onClick={() => {
            // setOpenIndex(null);x`
          }}
        >
          {surroundingLightInfoData?.data.data.traffics.map((data, index) => {
            return (
              <CustomOverLay
                key={data.id}
                surroundingLightInfoData={data}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            );
          })}
          {navigationBarState === "Home" ? (
            <>
              <LightDetailInfo isLoggein={isLoggein} />
            </>
          ) : null}
          {navigationBarState === "TrafficSignal" ? (
            <>
              <SurroundingLightInfo
                isLoading={isLoading}
                surroundingLightInfoData={
                  surroundingLightInfoData?.data.data.traffics
                }
                isLoggein={isLoggein}
              />
            </>
          ) : null}
          {navigationBarState === "Favorites" ? (
            <FavoriteInfo panToPoint={panTo} />
          ) : null}
          <MapMarker
            position={state.center}
            image={{ src: locationIcon, size: { width: 30, height: 30 } }}
          />
        </Map>
        <PanToButton
          onClick={panTo}
          $openState={openState}
          $navigationBarState={navigationBarState}
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
    </NavigationBarLayout>
  );
};

export default HomePage;
