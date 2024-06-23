import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { addressState } from "../../../recoil/addressState/atom";

const TitleContainer = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  max-width: 390px;
  width: 100%;
  height: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: 700;
  font-size: 17px;
  text-indent: 20px;
  line-height: 90px;
`;

const ConfirmButton = styled.button`
  background-color: ${(props) => props.theme.blue};
  position: absolute;
  left: 5%;
  bottom: 20px;
  z-index: 1000;
  width: 90%;
  height: 40px;
  padding: 10px;
  border-radius: 3px;
  font-weight: 600;
  font-size: 16px;
  color: white;
`;
const Address = ({ mapAddress, mapLat, mapLng }) => {
  const location = useLocation();

  const { isDepartureInputClicked, isArrivalInputClicked } = location.state;

  const setRecoilAddress = useSetRecoilState(addressState);

  const handleConfirmClick = () => {
    if (isDepartureInputClicked) {
      setRecoilAddress((prev) => ({
        ...prev,
        departureAddress: mapAddress,
        startLat: mapLat,
        startLng: mapLng,
      }));
    } else if (isArrivalInputClicked) {
      setRecoilAddress((prev) => ({
        ...prev,
        arrivalAddress: mapAddress,
        endLat: mapLat,
        endLng: mapLng,
      }));
    }
  };

  return (
    <TitleContainer>
      {mapAddress}
      <Link to="/path">
        <ConfirmButton onClick={handleConfirmClick}>확인</ConfirmButton>
      </Link>
    </TitleContainer>
  );
};

export default Address;
