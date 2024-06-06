import React from "react";
import styled from "styled-components";
import kakaoLoginImage from "../../../assets/icon/kakaoLoginImage.png";

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: white;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 18px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
`;

const KakaoLoginButton = styled.img`
  width: 100%;
  cursor: pointer;
  margin-top: 20px;
`;

const Modal = ({ isOpen, onClick, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <StyledModal onClick={onClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p>로그인이 필요한 서비스 입니다.</p>
        <KakaoLoginButton src={kakaoLoginImage} alt="카카오톡으로 시작하기" />
      </ModalContent>
    </StyledModal>
  );
};

export default Modal;
