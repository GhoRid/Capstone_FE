import React from "react";
import BaseModal from "../../../components/BaseModal";
import styled from "styled-components";
import kakaoImage from "../../../assets/icon/kakaoImage.png";
import { KAKAO_AUTH_URL } from "../../../shared/KakaoAuth";

const KakaoLoginButton = styled.button`
  background-color: #fee500; // 카카오 노란색
  border-radius: 12px;
  border: none;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  width: 300px;
  height: 44px;
  cursor: pointer;
  margin-top: 34px;
`;

const KakaoLoginButtonImage = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const Text = styled.p`
  margin-top: 32px;
  font-size: 18px;
  text-align: center;
`;

const KakaoLoginButtonText = styled.span`
  text-align: center;
`;

const KakaoLoginModal = ({ isOpen, onRequestClose }) => {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Text>로그인이 필요한 서비스 입니다.</Text>
      <KakaoLoginButton onClick={handleLogin}>
        <KakaoLoginButtonImage src={kakaoImage} alt="Kakao logo" />
        <KakaoLoginButtonText>카카오톡으로 시작하기</KakaoLoginButtonText>
      </KakaoLoginButton>
    </BaseModal>
  );
};

export default KakaoLoginModal;
