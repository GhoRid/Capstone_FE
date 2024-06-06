import { styled } from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import locationIcon from "../../../assets/icon/location.png";
import centerLocationIcon from "../../../assets/icon/centerLocationIcon.webp";
import PathTitle from "./PathTitle";
import Address from "./Address";

const { kakao } = window;

const Container = styled.div`
  max-width: 390px;
  width: 100vh;
  //height: calc(100vh - 80px);
  height: 100vh;
  height: 100dvh; /* Mobile */
  position: relative;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const PanToButton = styled.button`
  position: absolute;
  bottom: 19dvh;
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

const CenterLocationIcon = styled.img.attrs({
  src: centerLocationIcon,
  alt: "centerLocationIcon",
})`
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 45px;
  margin-top: -60px; // 좌표 아이콘 위치 조정(하단 꼭지점이 중앙에 위치하도록)
`;

const PathSearchPage = () => {
  const [map, setMap] = useState(null);
  const [state, setState] = useState({
    center: {
      lat: 35.17828963,
      lng: 126.909254315,
    },
    errMsg: null,
    isLoading: true,
  });
  const [result, setResult] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const panTo = () => {
    const newLatLng = new kakao.maps.LatLng(state.center.lat, state.center.lng);
    map.panTo(newLatLng);
  };

  // const handleBackwardButtonClick = (event) => {
  //   event.stopPropagation();
  // };

  var geocoder = new kakao.maps.services.Geocoder();

  var callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result[0].address.address_name);
      setAddress(result[0].address.address_name);
    }
  };

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
    <Container>
      <PathTitle />
      <Map
        id="map"
        center={state.center}
        style={{
          width: "100%",
          //height: "calc(100vh - 80px)",
          height: "calc(100dvh - 205px)",
        }}
        padding={64}
        level={3}
        minLevel={4}
        onCreate={setMap}
        onDragEnd={(map) => {
          const latlng = map.getCenter();
          var coord = new kakao.maps.LatLng(
            map.getCenter().getLat(),
            map.getCenter().getLng()
          );
          geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
          setResult(
            `변경된 지도 중심좌표는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`
          );
          setLat(coord.getLat());
          setLng(coord.getLng());
          //console.log(result);
        }}
      >
        {/* <MapMarker
          position={state.center}
          image={{ src: locationIcon, size: { width: 30, height: 30 } }}
        /> Mapmarker 필요시 코드 사용*/}
        <CenterLocationIcon />
      </Map>
      <PanToButton
        onClick={() => {
          panTo();
          // console.log(map.getBounds());
        }}
        //$openState={openState}
        //$navigationBarState={navigationBarState}
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
      <Address mapAddress={address} mapLat={lat} mapLng={lng} />
    </Container>
  );
};

export default PathSearchPage;
