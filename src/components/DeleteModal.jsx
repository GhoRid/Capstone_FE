import { useLocation } from "react-router-dom";
import BaseModal from "./BaseModal";
import { useMutation } from "@tanstack/react-query";
import { deleteFavoriteTraffic } from "../apis/api/traffic";
import styled from "styled-components";

const TextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 80%;
`;

const Text = styled.p`
  font-size: 23px;
  font-weight: 600;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;

const DeleteButton = styled.button``;

const DeleteText = styled.p`
  color: red;
  font-size: 15px;
  font-weight: 600;
`;

const CancelDeleteButton = styled.button``;

const CancelDeleteText = styled.p`
  font-size: 15px;
`;

const DeleteModal = ({ isOpen, onRequestClose, id }) => {
  const location = useLocation().pathname;

  const { mutate: deleteTraffic } = useMutation({
    mutationFn: deleteFavoriteTraffic,
    onSuccess: () => {
      alert("삭제되었습니다.");
      onRequestClose();
      //리로드하여 데이터 refetch
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
    return;
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <TextBox>
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <Text>삭제하시겠습니까?</Text>
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
