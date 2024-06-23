import { useLocation } from "react-router-dom";
import BaseModal from "./BaseModal";
import { useMutation } from "@tanstack/react-query";
import { deleteFavoriteTraffic } from "../apis/api/traffic";
import styled from "styled-components";

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 280px;
  height: 75%;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
`;

const Text = styled.p`
  font-size: 15px;
  font-weight: 400;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;

const DeleteButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: #f44336;
  border-radius: 5px;
`;

const DeleteText = styled.p`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
`;

const CancelDeleteButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: #ddd;
  border-radius: 5px;
`;

const CancelDeleteText = styled.p`
  color: #666;
  font-size: 15px;
`;

const DeleteModal = ({ isOpen, onRequestClose, id }) => {
  const location = useLocation().pathname;

  const { mutate: deleteTraffic } = useMutation({
    mutationFn: deleteFavoriteTraffic,
    onSuccess: () => {
      alert("삭제되었습니다.");
      onRequestClose();
      window.location.reload();
    },
    onError: (err) => {
      alert("삭제에 실패했습니다.");
    },
  });

  const { mutate: deletePath } = useMutation({
    mutationFn: deleteFavoriteTraffic,
    onSuccess: () => {
      alert("삭제되었습니다.");
      onRequestClose();

      window.location.reload();
    },
    onError: (err) => {
      alert("삭제에 실패했습니다.");
    },
  });

  const deleteFunction = () => {
    if (location === "/mypage/favoritestraffic") {
      deleteTraffic(id);
    }
    if (location === "/mypage/favoritesroute") {
      deletePath(id);
    }
    return;
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <TextBox>
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="23" cy="23" r="23" fill="#F7E2E1" />
          <rect
            width="24"
            height="24"
            transform="translate(11 11)"
            fill="#F7E2E1"
          />
          <path
            d="M27 17V16.2C27 15.0799 27 14.5198 26.782 14.092C26.5903 13.7157 26.2843 13.4097 25.908 13.218C25.4802 13 24.9201 13 23.8 13H22.2C21.0799 13 20.5198 13 20.092 13.218C19.7157 13.4097 19.4097 13.7157 19.218 14.092C19 14.5198 19 15.0799 19 16.2V17M21 22.5V27.5M25 22.5V27.5M14 17H32M30 17V28.2C30 29.8802 30 30.7202 29.673 31.362C29.3854 31.9265 28.9265 32.3854 28.362 32.673C27.7202 33 26.8802 33 25.2 33H20.8C19.1198 33 18.2798 33 17.638 32.673C17.0735 32.3854 16.6146 31.9265 16.327 31.362C16 30.7202 16 29.8802 16 28.2V17"
            stroke="#C03A32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Title>
          즐겨찾기 삭제
          <Text>삭제하시면 다시 복구할 수 없습니다. </Text>
        </Title>
      </TextBox>
      <ButtonBox>
        <DeleteButton onClick={deleteFunction}>
          <DeleteText>삭제</DeleteText>
        </DeleteButton>
        <CancelDeleteButton onClick={onRequestClose}>
          <CancelDeleteText>취소</CancelDeleteText>
        </CancelDeleteButton>
      </ButtonBox>
    </BaseModal>
  );
};

export default DeleteModal;
