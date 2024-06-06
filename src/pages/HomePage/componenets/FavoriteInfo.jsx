import { motion, useDragControls } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import KakaoLoginModal from "./KakaoLoginModal";
import Text from "./Text";
import Loader from "./Loader";
import { fetchFavoriteTraffic } from "../../../apis/api/traffic";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { bottomSheetOpenState } from "../../../recoil/bottomSheetOpenState/atom";
import { useNavigate } from "react-router-dom";

const Container = styled(motion.div)`
  width: 100%;
  height: 100dvh;
  background-color: white;
  position: absolute;
  z-index: 1000;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.2);
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

const ListStateBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 36px;
  width: 256px;
  height: 36px;
  margin-top: 20px;
`;

const NotLoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20%;
`;

const NotLoginText = styled.p`
  font-size: 18px;
  color: #dadada;
`;

const BaseBox = styled.div`
  width: 128px;
  height: 36px;
  border-radius: 36px;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Path = styled(BaseBox)`
  ${(props) =>
    props.$listState === "path"
      ? "border: 1px solid black; background-color: white; color: black;"
      : "border: 1px solid transparent; background-color: transparent; color: #666666;"};
`;

const TrafficLight = styled(BaseBox)`
  ${(props) =>
    props.$listState === "trafficLight"
      ? "border: 1px solid black; background-color: white; color: black;"
      : "border: 1px solid transparent; background-color: transparent; color: #666666;"};
`;

const Content = styled.div`
  margin-top: 20px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 8px;
  border-bottom: 3px solid ${({ theme }) => theme.gray};
`;

const Button = styled.button`
  color: #535ce8;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ListBox = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.gray};
`;

const List = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 16px;
`;

const FavoritesInfo = ({ panToPoint }) => {
  const isLoggein = !!localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [listState, setListState] = useState("trafficLight");
  const [openState, setOpenState] = useRecoilState(bottomSheetOpenState);
  const navigate = useNavigate();

  const dragControls = useDragControls();

  const { isLoading, data: favoritesTraffic } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavoriteTraffic,
    enabled: isLoggein,
    onError: (e) => {
      console.log(e);
    },
  });

  const handleLoginModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Container
        $favoritesInfoOpenState={openState.favoritesInfoOpenState}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        animate={openState.favoritesInfoOpenState}
        variants={{
          top: { top: `10dvh` },
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

          const isOverOffsetThreshold =
            Math.abs(info.offset.y) > offsetThreshold;
          const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;

          const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;

          if (!isOverThreshold) return;

          const isGoDown = info.offset.y > 0;

          if (isGoDown && openState.favoritesInfoOpenState === "top") {
            setOpenState((prev) => ({
              ...prev,
              favoritesInfoOpenState: "mid",
            }));
          } else if (isGoDown && openState.favoritesInfoOpenState === "mid") {
            setOpenState((prev) => ({
              ...prev,
              favoritesInfoOpenState: "closed",
            }));
          } else if (!isGoDown && openState.favoritesInfoOpenState === "mid") {
            setOpenState((prev) => ({
              ...prev,
              favoritesInfoOpenState: "top",
            }));
          } else if (
            !isGoDown &&
            openState.favoritesInfoOpenState === "closed"
          ) {
            setOpenState((prev) => ({
              ...prev,
              favoritesInfoOpenState: "mid",
            }));
          }
        }}
      >
        <HeaderBox onPointerDown={(e) => dragControls.start(e)}>
          <HandleBar />
          <ListStateBox>
            <button
              onClick={() => {
                setListState("trafficLight");
              }}
            >
              <TrafficLight $listState={listState}>
                <svg
                  width="9"
                  height="19"
                  viewBox="0 0 9 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="7.45438"
                    height="15.2584"
                    rx="2.5"
                    fill={listState === "trafficLight" ? "black" : "#666"}
                    stroke={listState === "trafficLight" ? "black" : "#666"}
                  />
                  <rect
                    x="3.89793"
                    y="16.0425"
                    width="0.902311"
                    height="2.10539"
                    stroke={listState === "trafficLight" ? "black" : "#666"}
                    strokeWidth="0.902311"
                  />
                  <circle cx="4.23518" cy="3.60932" r="1.50385" fill="white" />
                  <circle cx="4.23518" cy="7.91743" r="1.50385" fill="white" />
                  <circle cx="4.23518" cy="12.226" r="1.50385" fill="white" />
                </svg>
                신호등
              </TrafficLight>
            </button>
            <button
              onClick={() => {
                setListState("path");
              }}
            >
              <Path $listState={listState}>
                <svg
                  width="11"
                  height="17"
                  viewBox="0 0 11 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_315_2278" fill="white">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.84249 8.2618C10.322 7.44158 10.5978 6.48087 10.5978 5.45386C10.5978 2.44178 8.22543 0 5.29892 0C2.37241 0 0 2.44178 0 5.45386C0 6.48165 0.276226 7.44304 0.756439 8.26367L5.29894 16.3616L9.84249 8.2618Z"
                    />
                  </mask>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.84249 8.2618C10.322 7.44158 10.5978 6.48087 10.5978 5.45386C10.5978 2.44178 8.22543 0 5.29892 0C2.37241 0 0 2.44178 0 5.45386C0 6.48165 0.276226 7.44304 0.756439 8.26367L5.29894 16.3616L9.84249 8.2618Z"
                    fill={listState === "path" ? "black" : "#666"}
                  />
                  <path
                    d="M9.84249 8.2618L8.97921 7.75709L8.9747 7.76479L8.97034 7.77257L9.84249 8.2618ZM0.756439 8.26367L1.62859 7.77444L1.62413 7.76649L1.61953 7.75862L0.756439 8.26367ZM5.29894 16.3616L4.42679 16.8508L5.29894 18.4056L6.17109 16.8508L5.29894 16.3616ZM9.59784 5.45386C9.59784 6.29998 9.371 7.08694 8.97921 7.75709L10.7058 8.76652C11.2731 7.79622 11.5978 6.66176 11.5978 5.45386H9.59784ZM5.29892 1C7.64618 1 9.59784 2.9667 9.59784 5.45386H11.5978C11.5978 1.91685 8.80469 -1 5.29892 -1V1ZM1 5.45386C1 2.9667 2.95166 1 5.29892 1V-1C1.79315 -1 -1 1.91685 -1 5.45386H1ZM1.61953 7.75862C1.22718 7.08814 1 6.30062 1 5.45386H-1C-1 6.66268 -0.674727 7.79794 -0.106648 8.76873L1.61953 7.75862ZM6.17109 15.8723L1.62859 7.77444L-0.115714 8.75291L4.42679 16.8508L6.17109 15.8723ZM8.97034 7.77257L4.42679 15.8723L6.17109 16.8508L10.7146 8.75104L8.97034 7.77257Z"
                    fill={listState === "path" ? "black" : "#666"}
                    mask="url(#path-1-inside-1_315_2278)"
                  />
                  <ellipse
                    cx="5.29876"
                    cy="5.45383"
                    rx="2.47283"
                    ry="2.54513"
                    fill="white"
                  />
                </svg>
                경로
              </Path>
            </button>
          </ListStateBox>
        </HeaderBox>
        <Content>
          <ContentHeader>
            <Text $fontWeight={600}>
              내 즐겨찾기 {listState === "path" ? "경로" : "신호등"}
            </Text>
            <Button
              onClick={() => {
                if (isLoggein) {
                  if (listState === "path") {
                    navigate("/mypage/favoritesroute");
                  } else {
                    navigate("/mypage/favoritestraffic");
                  }
                } else {
                  handleLoginModal();
                }
              }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.59532 0.303154C8.2026 -0.101052 7.5536 -0.101051 7.16088 0.303155L0.681015 6.97249C0.670956 6.98284 0.670956 6.99931 0.681015 7.00967C0.689245 7.01814 0.690586 7.03093 0.686915 7.04215C0.685443 7.04666 0.684244 7.05135 0.683347 7.05623L0.00176677 10.7636C-0.011145 10.8338 0.0486838 10.8954 0.11692 10.8821L3.71894 10.1806C3.72478 10.1794 3.73035 10.1778 3.73563 10.1758C3.74457 10.1724 3.75502 10.1736 3.76169 10.1804C3.76982 10.1888 3.78326 10.1888 3.79139 10.1804L10.3146 3.46643C10.6917 3.07837 10.6917 2.46081 10.3146 2.07274L8.59532 0.303154Z"
                  fill="#535CE8"
                />
              </svg>
              편집
            </Button>
          </ContentHeader>
          {isLoggein ? (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {listState === "path" ? (
                    <></>
                  ) : (
                    <>
                      {favoritesTraffic.data.data.traffics?.map((traffic) => (
                        <ListBox key={traffic.id}>
                          <button
                            onClick={() => {
                              panToPoint(traffic.point);
                            }}
                          >
                            <List>
                              <svg
                                width="23"
                                height="23"
                                viewBox="0 0 23 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="11.5"
                                  cy="11.5"
                                  r="11.5"
                                  fill="#F25C5C"
                                />
                                <path
                                  d="M10.4173 9.20972L11.5 5.87731L12.5828 9.20972C12.6899 9.53934 12.997 9.76251 13.3436 9.76251L16.8475 9.76251L14.0128 11.822C13.7324 12.0258 13.6151 12.3869 13.7222 12.7165L14.805 16.0489L11.9702 13.9893C11.6899 13.7856 11.3102 13.7856 11.0298 13.9893L8.19507 16.0489L9.27784 12.7165C9.38494 12.3869 9.26761 12.0258 8.98722 11.822L6.15251 9.76251L9.65641 9.76251C10.003 9.76251 10.3102 9.53934 10.4173 9.20972Z"
                                  fill="white"
                                  stroke="white"
                                />
                              </svg>
                              <Text>{traffic.name}</Text>
                            </List>
                          </button>
                        </ListBox>
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <NotLoginBox>
              <NotLoginText>
                자주가는 경로와 장소를 찾을 수 없습니다.
                <br />
                로그인이 필요합니다.
              </NotLoginText>
            </NotLoginBox>
          )}
        </Content>
      </Container>
      <KakaoLoginModal isOpen={isOpen} onRequestClose={handleLoginModal} />
    </>
  );
};

export default FavoritesInfo;
