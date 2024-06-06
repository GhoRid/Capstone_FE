import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BookMarkHeader = styled.div`
  background-color: #fff;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

const PreClick = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  border: none;
  background-color: transparent;
`;

const Title = styled.h2`
  width: 100%;
  margin: 0;
  padding: 0;
  display: inline-block;
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 2.5;
`;

const Header = ({ children }) => {
  // 이전 페이지로 이동
  const navigate = useNavigate();
  const handlePreClick = () => {
    navigate(-1);
  };

  return (
    <BookMarkHeader>
      <PreClick onClick={handlePreClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="22"
          fill="none"
        >
          <path
            stroke="#000"
            strokeLinecap="round"
            strokeWidth="2"
            d="M12.037 1.55 1.431 11.082M1.667 11.293l10.606 9.532"
          />
        </svg>
      </PreClick>
      <Title>{children}</Title>
    </BookMarkHeader>
  );
};

export default Header;
