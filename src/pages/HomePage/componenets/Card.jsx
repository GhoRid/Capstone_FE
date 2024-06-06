import { styled } from "styled-components";
import trafficLightImage from "../../../assets/trafficLightImg.png";
import Text from "./Text";
import { useCountDown } from "../../../hooks/useCountDown";
import { useState } from "react";
import KakaoLoginModal from "./KakaoLoginModal";
import { useHandleFavoriteTraffic } from "../../../hooks/handleFavoriteTraffic";

const Contianer = styled.div`
  width: 90%;
  height: 11dvh;
  border-radius: 3px;
  border: 1px solid black;
  margin: 0 auto;
  position: relative;
`;

const Image = styled.img`
  width: 6dvh;
  height: 6dvh;
  position: absolute;
  top: 10%;
`;

const AddressText = styled.span`
  font-size: 18px;
  position: absolute;
  top: 18%;
  left: 15%;
`;

const DetailAddressText = styled.span`
  font-size: 12px;
  position: absolute;
  top: 42%;
  left: 15%;
  color: ${({ theme }) => theme.gray};
`;

const DistanceText = styled.span`
  font-size: 14px;
  position: absolute;
  top: 20%;
  left: 48%;
  color: ${({ theme }) => theme.red};
`;

const IsFavoriteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  position: absolute;
  top: 20%;
  right: 4%;
`;

const Lights = styled.div`
  display: flex;
  position: absolute;
  bottom: 12%;
  right: 4%;
`;

const Light = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $lightColor, theme }) =>
    $lightColor === "green" ? theme.green : theme.red};
`;

const RemainingTimeText = styled.span`
  font-weight: 700;
  color: ${({ $lightColor, theme }) =>
    $lightColor === "green" ? theme.green : theme.red};
`;

const Card = ({ surroundingLightInfoData, isLoggein }) => {
  const {
    color,
    detail,
    id,
    isFavorite,
    greenCycle,
    redCycle,
    timeLeft,
    viewName,
  } = surroundingLightInfoData;

  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleLoginModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  const handleFavorite = useHandleFavoriteTraffic({
    id: id,
    viewName: viewName,
    isFavorite: isFavorite,
  });

  const timeLeftCountDown = useCountDown(timeLeft);

  return (
    <Contianer>
      <Image src={trafficLightImage}></Image>
      <AddressText>{viewName}</AddressText>
      <DistanceText>26m</DistanceText>
      <DetailAddressText>176-48 (전남대공과대학 방면)</DetailAddressText>
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
      <Lights>
        <Light>
          <Text>서쪽</Text>
          <RemainingTimeText $lightColor={color}>
            {timeLeftCountDown}초
          </RemainingTimeText>
          <Circle $lightColor={color} />
        </Light>
      </Lights>
      <KakaoLoginModal
        isOpen={isModalOpened}
        onRequestClose={handleLoginModal}
      />
    </Contianer>
  );
};

export default Card;
