import React, { useState, useRef } from "react";
import styled from "styled-components";
import NavigationBarLayout from "../../components/NavigationBarLayout";
import Header from "../../components/Header";
import BasicUserImg from "../../assets/icon/basicProfileW.webp";
import UpdateProfile from "../../assets/icon/updateProfile.webp";
import { useRecoilValue } from "recoil";
import { userInformationState } from "../../recoil/userInformationState/atom";
import { updateProfileImage } from "../../apis/api/profile";
import { useMutation } from "@tanstack/react-query";

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
  margin: 18px 5px;
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

const CommitButton = styled.button`
  width: 100%;
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

  const handleImgUpload = (imageData) => {
    mutate(imageData);
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
          <CommitButton
            onClick={() => {
              const formData = new FormData();
              formData.append("files", uploadImg);
              handleImgUpload(formData);
              console.log("완료");
            }}
          >
            완료
          </CommitButton>
        </Bottom>
      </Container>
    </NavigationBarLayout>
  );
};

export default UserProfileUpdate;
