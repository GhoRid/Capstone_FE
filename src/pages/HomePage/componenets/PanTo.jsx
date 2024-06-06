import { styled } from "styled-components";

const PanToButton = styled.button`
  position: absolute;
  bottom: ${({ $openState, $navigationBarState }) =>
    ($openState.detailInfoOpenState?.openState === "closed" &&
      $navigationBarState === "Home") ||
    ($openState.surroundingLightInfoOpenState === "closed" &&
      $navigationBarState === "TrafficSignal") ||
    ($openState.favoritesInfoOpenState === "closed" &&
      $navigationBarState === "Favorites")
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

const PanTo = () => {
  return (
    <PanToButton
      onClick={() => {
        panTo();
        // console.log(map.getBounds());
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
  );
};

export default PanTo;
