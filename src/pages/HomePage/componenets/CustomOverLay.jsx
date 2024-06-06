import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { ReactComponent as Traffic } from "../../../assets/icon/traffic.svg";
import Text from "./Text";
import { useSetRecoilState } from "recoil";
import { bottomSheetOpenState } from "../../../recoil/bottomSheetOpenState/atom";
import { navigationState } from "../../../recoil/navigationState/atom";

const Container = styled.div`
  position: relative;
`;

const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 95%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomOverLay = ({ surroundingLightInfoData, isOpen, onToggle }) => {
  const { id, isFavorite, point, viewName } = surroundingLightInfoData;
  const setDetailInfoOpenState = useSetRecoilState(bottomSheetOpenState);
  const setCurrentNavigationState = useSetRecoilState(navigationState);

  return (
    <>
      {isOpen ? (
        <CustomOverlayMap position={point} yAnchor={1.0} xAnchor={0.45}>
          <Container>
            <button
              onClick={() => {
                setDetailInfoOpenState((prev) => ({
                  ...prev,
                  detailInfoOpenState: { openState: "mid", id: id },
                }));
                setCurrentNavigationState("Home");
              }}
            >
              <svg
                width="187"
                height="84"
                viewBox="0 0 187 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_315_682)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 1C4.47715 1 0 5.47715 0 11V59C0 64.5228 4.47715 69 10 69H82.6189L85.0855 75.9908C85.5563 77.3254 87.4437 77.3254 87.9145 75.9908L90.3811 69H166C171.523 69 176 64.5228 176 59V11C176 5.47715 171.523 1 166 1H10Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_315_682"
                    x="0"
                    y="0"
                    width="187"
                    height="83.9917"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="7" dy="3" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_315_682"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_315_682"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <Box>
                <ImageBox>
                  <Traffic />
                </ImageBox>
                <TextBox>
                  <Text $fontSize="16px" $fontWeight="600">
                    {viewName}
                  </Text>
                </TextBox>
              </Box>
            </button>
          </Container>
        </CustomOverlayMap>
      ) : (
        <CustomOverlayMap position={point} yAnchor={1.0}>
          <button onClick={onToggle}>
            <Traffic />
          </button>
        </CustomOverlayMap>
      )}
    </>
  );
};

export default CustomOverLay;
