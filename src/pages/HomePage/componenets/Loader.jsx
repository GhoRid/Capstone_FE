import styled, { keyframes } from "styled-components";

const Display = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 25px;
  width: 100%;
  height: 30dvh;
  z-index: -100000;
`;

const bounceAnimation = keyframes`
  0%, 80%, 100% {
      transform: translateY(0);
  }
  40% {
      transform: translateY(-12px);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60px;
`;

const LoadingDot = styled.div`
  width: 16px;
  height: 16px;
  background-color: #ff1645;
  border-radius: 50%;
  animation: ${bounceAnimation} 1.4s ease infinite;
  &:nth-child(2) {
    animation-delay: 0.2s;
    background-color: #ffea2d;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
    background-color: #19c30a;
  }
`;

const Loader = () => {
  return (
    <Display>
      <LoadingContainer>
        <LoadingDot />
        <LoadingDot />
        <LoadingDot />
      </LoadingContainer>
    </Display>
  );
};

export default Loader;
