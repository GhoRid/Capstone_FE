import { styled } from "styled-components";
import backwardIcon from "../../../assets/icon/backwardIcon.webp";
import { Link } from "react-router-dom";

const TitleContainer = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: row;
  max-width: 390px;
  width: 100%;
  height: 60px;
  text-align: center;
  position: relative;
`;

const BackwardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  position: absolute;
  width: 15%;
  z-index: 1;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
`;

const BackwardButton = styled.button`
  background-image: url(${backwardIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  width: 25px;
  height: 25px;
`;

const PathTitle = () => {
  return (
    <TitleContainer>
      <BackwardBox>
        <Link to="/path">
          <BackwardButton />
        </Link>
      </BackwardBox>
      <TitleBox>지도에서 선택</TitleBox>
    </TitleContainer>
  );
};

export default PathTitle;
