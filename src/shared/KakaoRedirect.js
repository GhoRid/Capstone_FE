import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SpinnerImg from "../assets/icon/Spinner.gif";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addMember } from "../apis/api/members";
import TimeOutModal from "../components/TimeOutModal";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  font-size: 13px;
  text-align: center;
`;

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [ishandleTimeOut, setIshandleTimeOut] = useState(false);

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  const { mutate } = useMutation({
    mutationFn: (code) => addMember(code),
    onSuccess: (res) => {
      console.log("성공", res);
      clearTimeout(loginTimeOut);
      localStorage.setItem("token", res.data.data.accessToken);
      navigate("/mypage");
      window.location.reload();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const loginTimeOut = setTimeout(() => {
    setIshandleTimeOut(true);
  }, 6000);

  const handleTimeOutModal = () => {
    setIshandleTimeOut((prev) => !prev);
    navigate("/");
  };

  useEffect(() => {
    mutate({ code });
  }, []);

  return (
    <Layout>
      <Container>
        <Inner>
          <Image src={SpinnerImg} alt="spinner" />
          <Text>
            잠시만 기다려주세요!
            <br />
            로그인 중 입니다.
          </Text>
        </Inner>
      </Container>
      <TimeOutModal
        isOpen={ishandleTimeOut}
        onRequestClose={handleTimeOutModal}
      />
    </Layout>
  );
};

export default KakaoRedirect;
