import React, { useState } from "react";
import styled from "styled-components";
import BaseModal from "./BaseModal";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updateFavoriteTraffic } from "../apis/api/traffic";
import { updateFavoritePathById } from "../apis/api/paths";

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const UpdateContainer = styled.div`
  width: 300px;
  height: 45px;
  display: flex;
  align-items: center;
  margin: 15px 0px;
`;
const Alias = styled.input`
  width: 100%;
  height: 100%;
  position: relative;
`;
const DeleteBtn = styled.button`
  position: absolute;
  right: 30px;
  width: 30px;
  height: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;
const RequestBtn = styled.button`
  width: 80px;
  height: 40px;
  background-color: #ddd;
  border-radius: 5px;
`;
const RequestText = styled.p`
  font-size: 15px;
  color: #666666;
`;
const CommitBtn = styled.button`
  width: 80px;
  height: 40px;
  background-color: #535ce8;
  border-radius: 5px;
`;
const CommitText = styled.p`
  font-size: 15px;
  color: #fff;
`;

const UpdateModal = ({ isOpen, onRequestClose, id }) => {
  const location = useLocation().pathname;
  const [alias, setAlias] = useState();

  const { mutate: updateTraffic } = useMutation({
    mutationFn: updateFavoriteTraffic,
    onSuccess: () => {
      alert("수정되었습니다.");
      onRequestClose();

      window.location.reload();
    },
    onError: (err) => {
      alert("수정에 실패했습니다.");
    },
  });

  const { mutate: updatePath } = useMutation({
    mutationFn: updateFavoritePathById,
    onSuccess: () => {
      alert("수정되었습니다.");
      onRequestClose();

      window.location.reload();
    },
    onError: (err) => {
      alert("수정에 실패했습니다.");
    },
  });

  const updateAlias = () => {
    if (location === "/mypage/favoritestraffic") {
      updateTraffic({ trafficId: id, alias: alias });
    }
    if (location === "/mypage/favoritesroute") {
      updatePath(id);
    }
    return;
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Title>별칭 수정</Title>
      <UpdateContainer>
        <Alias
          type="text"
          placeholder={alias}
          onChange={(e) => {
            setAlias(e.target.value);
          }}
        />
        <DeleteBtn>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="none"
          >
            <path
              fill="#666"
              fillOpacity=".25"
              d="M6.5 13a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
            />
            <path
              stroke="#666"
              strokeLinecap="round"
              strokeWidth=".75"
              d="m4.333 4.333 4.334 4.334m0-4.333L4.333 8.666"
            />
          </svg>
        </DeleteBtn>
      </UpdateContainer>
      <ButtonContainer>
        <CommitBtn onClick={updateAlias} disabled={!!alias ? false : true}>
          <CommitText>수정</CommitText>
        </CommitBtn>
        <RequestBtn onClick={onRequestClose}>
          <RequestText>취소</RequestText>
        </RequestBtn>
      </ButtonContainer>
    </BaseModal>
  );
};

export default UpdateModal;
