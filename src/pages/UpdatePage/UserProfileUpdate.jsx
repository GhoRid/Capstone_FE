import React, { useState, useRef } from "react";
import styled from "styled-components";
import NavigationBarLayout from "../../components/NavigationBarLayout";
import Header from "../../components/Header";
import UpdateProfile from "../../assets/icon/updateProfile.webp";
import { useRecoilValue } from "recoil";
import { userInformationState } from "../../recoil/userInformationState/atom";
import { useMutation } from "@tanstack/react-query";
import { updateProfileImage } from "./../../apis/api/members";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  position: relative;
`;

const Inner = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const UserProfile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;
const UserImg = styled.img`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;
const PhotoAddIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Update = styled.img`
  opacity: 0.8;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const UserName = styled.div`
  width: 100%;
  margin-top: 30px;
  position: absolute;
  top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #666;
  text-align: center;
  letter-spacing: 3px;
`;

const Bottom = styled.div`
  width: 100%;
  position: absolute;
  bottom: 50px;
`;

const DeleteUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 20px;
`;
const Text = styled.span`
  font-size: 12px;
  color: #ababab;
  margin-right: 20px;
`;
const DeleteButton = styled.button`
  font-size: 12px;
  color: #ababab;
  border: none;
  background-color: transparent;
`;

const CommitBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommitButton = styled.button`
  width: 90%;
  height: 50px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  background-color: #535ce8;
  border: none;
  border-radius: 5px;
`;

const UserProfileUpdate = () => {
  const userInfo = useRecoilValue(userInformationState);
  const { nickName, profileImage } = userInfo;
  const [uploadImg, setUploadImg] = useState(profileImage);
  const fileInput = useRef();

  const { mutate } = useMutation({
    mutationFn: updateProfileImage,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleImgChange = (e) => {
    const selectedImg = e.target.files[0];
    if (selectedImg) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setUploadImg(reader.result);
      };
      reader.readAsDataURL(selectedImg);
    }
  };

  const handleImgUpload = async (base64ImageData) => {
    // Base64 문자열에서 데이터 파트만 추출
    const base64Response = base64ImageData.split(";base64,").pop();

    // Blob 객체로 변환
    const imageBlob = await fetch(
      `data:image/jpeg;base64,${base64Response}`
    ).then((res) => res.blob());

    const formData = new FormData();
    // Blob 객체를 FormData에 추가
    formData.append("profile", imageBlob, "profile.jpg"); // "profile.jpg"는 서버에서 요구하는 파일명에 따라 바꿔야 할 수도 있습니다.

    // PATCH 요청 보내기
    mutate(formData);
  };

  return (
    <NavigationBarLayout>
      <Header>내 정보 수정</Header>
      <Container>
        <Inner>
          <UserProfile>
            <UserImg src={uploadImg} size={150} />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              name="profile_img"
              onChange={handleImgChange}
              ref={fileInput}
            />
            <PhotoAddIcon
              onClick={() => {
                fileInput.current.click();
              }}
            >
              <Update src={UpdateProfile} alt="updatebutton" />
            </PhotoAddIcon>
          </UserProfile>
        </Inner>
        <UserName>
          <Name>{nickName}</Name>
        </UserName>
        <Bottom>
          <DeleteUser>
            <Text>회원정보를 삭제하시겠습니까?</Text>
            <DeleteButton>회원탈퇴</DeleteButton>
          </DeleteUser>
          <CommitBox>
            <CommitButton
              onClick={() => {
                handleImgUpload(uploadImg);
              }}
            >
              완료
            </CommitButton>
          </CommitBox>
        </Bottom>
      </Container>
    </NavigationBarLayout>
  );
};

export default UserProfileUpdate;
