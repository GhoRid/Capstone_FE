import styled from "styled-components";
import { motion, useDragControls } from "framer-motion";
import Text from "./Text";
import { useRecoilState } from "recoil";
import { bottomSheetOpenState } from "../../../recoil/bottomSheetOpenState/atom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFavoriteTraffic,
  fetchTrafficById,
} from "../../../apis/api/traffic";
import Loader from "./Loader";
import { useCountDown } from "../../../hooks/useCountDown";
import { useEffect, useState } from "react";
import { useHandleFavoriteTraffic } from "./../../../hooks/handleFavoriteTraffic";
import KakaoLoginModal from "./KakaoLoginModal";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.gray};
`;

const HandleBar = styled.div`
  width: 78px;
  height: 2px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.gray};
`;

const TopBox = styled.div`
  width: 90%;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
`;

const AddressText = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const DetailAddressText = styled.span`
  font-size: 12px;
`;

const IsFavoriteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
`;

const DirectionInfoBox = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 220px;
  border-bottom: 2px solid ${({ theme }) => theme.gray};
`;

const RemainingTimeBox = styled.div`
  width: 60px;
  display: flex;
  justify-content: space-between;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color, theme }) =>
    color === "green " ? theme.green : theme.red};
`;

const RemainingTimeText = styled.span`
  font-weight: 700;
  color: ${({ color, theme }) => (color === "green" ? theme.green : theme.red)};
`;

const LightDetailInfo = ({ isLoggein }) => {
  const [openState, setOpenState] = useRecoilState(bottomSheetOpenState);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleLoginModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["trafficById", openState.detailInfoOpenState],
    queryFn: () => fetchTrafficById(openState.detailInfoOpenState.id),
    enabled: !!openState.detailInfoOpenState.id,
    onError: (e) => {
      console.log(e);
    },
  });

  const {
    id,
    color,
    detail,
    greenCycle,
    isFavorite,
    point,
    redCycle,
    timeLeft,
    viewName,
  } = data?.data.data.traffic || {};

  const timeLeftCountDown = useCountDown(timeLeft);

  const handleFavorite = useHandleFavoriteTraffic({
    id: id,
    viewName: viewName,
    isFavorite: isFavorite,
  });

  const dragControls = useDragControls();

  useEffect(() => {
    if (!id) return;
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch, id]);

  return (
    <Container
      $DetailInfoOpenState={openState.detailInfoOpenState?.openState}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      animate={openState.detailInfoOpenState?.openState}
      variants={{
        top: { top: `10dvh` },
        mid: { top: `50dvh` },
        closed: { top: `100dvh` },
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

        if (isGoDown && openState.detailInfoOpenState.openState === "top") {
          setOpenState((prev) => ({
            ...prev,
            detailInfoOpenState: {
              openState: "mid",
              id: openState.detailInfoOpenState.id,
            },
          }));
        } else if (
          isGoDown &&
          openState.detailInfoOpenState.openState === "mid"
        ) {
          setOpenState((prev) => ({
            ...prev,
            detailInfoOpenState: {
              openState: "closed",
              id: null,
            },
          }));
        } else if (
          !isGoDown &&
          openState.detailInfoOpenState.openState === "mid"
        ) {
          setOpenState((prev) => ({
            ...prev,
            detailInfoOpenState: {
              openState: "top",
              id: openState.detailInfoOpenState.id,
            },
          }));
        } else if (
          !isGoDown &&
          openState.detailInfoOpenState.openState === "closed"
        ) {
          setOpenState((prev) => ({
            ...prev,
            detailInfoOpenState: {
              openState: "top",
              id: openState.detailInfoOpenState.id,
            },
          }));
        }
      }}
    >
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <HeaderBox onPointerDown={(e) => dragControls.start(e)}>
            <HandleBar />
            <TopBox>
              <div>
                <AddressText>{viewName}</AddressText>
                <DetailAddressText>
                  {/* 176-48 (전남대공과대학 방면) */}
                </DetailAddressText>
              </div>
              <IsFavoriteButton
                onClick={() => {
                  isLoggein ? handleFavorite() : handleLoginModal();
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.52447 1.08156C9.67415 0.620903 10.3259 0.620905 10.4755 1.08156L11.9941 5.75532C12.1949 6.37336 12.7709 6.7918 13.4207 6.7918H18.335C18.8194 6.7918 19.0207 7.4116 18.6289 7.6963L14.6531 10.5848C14.1274 10.9668 13.9074 11.6439 14.1082 12.2619L15.6268 16.9357C15.7765 17.3963 15.2493 17.7794 14.8574 17.4947L10.8817 14.6061C10.3559 14.2242 9.64405 14.2242 9.11832 14.6061L5.14258 17.4947C4.75073 17.7794 4.22349 17.3963 4.37316 16.9357L5.89176 12.2619C6.09257 11.6439 5.87258 10.9668 5.34685 10.5848L1.37111 7.6963C0.979257 7.4116 1.18064 6.7918 1.66501 6.7918H6.57929C7.22913 6.7918 7.80506 6.37336 8.00587 5.75532L9.52447 1.08156Z"
                    fill={isFavorite ? "#F25C5C" : "none"}
                    stroke={isFavorite ? "#F25C5C" : "#DADADA"}
                  />
                </svg>
              </IsFavoriteButton>
            </TopBox>
          </HeaderBox>
          <DirectionInfoBox>
            <Text $fontWeight={600}>서쪽</Text>
            <RemainingTimeBox>
              <Circle color={color}></Circle>
              <RemainingTimeText color={color}>
                {timeLeftCountDown}초
              </RemainingTimeText>
            </RemainingTimeBox>
          </DirectionInfoBox>
        </>
      )}
      <KakaoLoginModal
        isOpen={isModalOpened}
        onRequestClose={handleLoginModal}
      />
    </Container>
  );
};

export default LightDetailInfo;
