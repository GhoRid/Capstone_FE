import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color:#fff;
  margin:0; padding:0;
  width:100%;
  height:56px;
  border-bottom:1px solid #ddd;
`;

const Title = styled.h2`
  width:100%;
  height:100%;
  margin:0;padding:0;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:18px;
  font-weight:bold;
  text-align:center;
`;

const Header = () => {
  return(
    <Container>
      <Title>마이페이지</Title>
    </Container>
  );
};

export default Header;