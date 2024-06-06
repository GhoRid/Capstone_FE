import React from "react";
import styled from "styled-components";
import kakaoImage from "../../../assets/icon/kakaoImage.png";
import characterImg from "../../../assets/icon/characterImage.png";
import { KAKAO_AUTH_URL } from "../../../shared/KakaoAuth";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ffffff;
`;

const TextBox = styled.div`
  position: absolute;
  top: 120px;
  left: 32px;
`;

const Text = styled.span`
  font-size: 30px;
  font-weight: bold;
  line-height: 2.2;
`;

const Img = styled.img`
  width: 220px;
  position: absolute;
  bottom: 100px;
  right: 32px;
`;

const KakaoLoginButton = styled.button`
  background-color: #fee500; // 카카오 노란색
  border-radius: 12px;
  border: none;
  color: black;
  display: flex;
  align-items: center;
  font-size: 16px;
  width: 300px;
  height: 50px;
  cursor: pointer;
  margin-top: 20px;
  position: absolute;
  left: 50%;
  bottom: 60px;
  transform: translate(-50%, 0);
`;

const KakaoLoginButtonImage = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const KakaoLoginButtonText = styled.span`
  flex-grow: 1;
  text-align: center;
  font-weight: bold;
`;

const NonUserPage = () => {
  // kakao 로그인 버튼 누르면 REDIRECT_URL로 이동
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Container>
      <TextBox>
        <Text>
          간편로그인 후 <br />
          이용이 <br />
          가능합니다.
        </Text>
      </TextBox>
      <Img src={characterImg} alt="character_img"></Img>
      <KakaoLoginButton onClick={handleLogin}>
        <KakaoLoginButtonImage src={kakaoImage} alt="Kakao logo" />
        <KakaoLoginButtonText>카카오톡으로 시작하기</KakaoLoginButtonText>
      </KakaoLoginButton>
    </Container>
  );
};

export default NonUserPage;
