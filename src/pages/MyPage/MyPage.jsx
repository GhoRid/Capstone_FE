import React, { useState } from "react";
import styled from "styled-components";
import NavigationBarLayout from "../../components/NavigationBarLayout";
import Header from "./components/Header";
import NonUserPage from "./components/NonUserPage";
import UserPage from "./components/UserPage";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  background-color: #f8f8ff;
  position: relative;
`;

const MyPage = () => {
  const token = localStorage.getItem("token");

  return (
    <NavigationBarLayout>
      <Header />
      <Container>{token ? <UserPage /> : <NonUserPage />}</Container>
    </NavigationBarLayout>
  );
};
export default MyPage;
