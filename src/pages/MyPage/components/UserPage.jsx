import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LocationIcon from "../../../assets/icon/locationIcon.webp";
import TrafficIcon from "../../../assets/icon/trafficIcon.webp";
import RouteIcon from "../../../assets/icon/routeIcon.webp";
import EditUserButton from "../../../assets/icon/editUserButton.webp";
import LogoutButton from "../../../assets/icon/logoutIcon.webp";
import { useSetRecoilState } from "recoil";
import { userInformationState } from "../../../recoil/userInformationState/atom";
import { useQuery } from "@tanstack/react-query";
import { fetchMemebers } from "../../../apis/api/members";
import { navigationState } from "../../../recoil/navigationState/atom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f8f8ff;
`;
const UserContainer = styled.div`
  width: 350px;
  height: 180px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translate(-50%, 0);
`;
const UserProfile = styled.div`
  width: 100%;
  margin-top: 25px;
  position: relative;
`;
const UserProfileInner = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;
const UserImgBox = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dadada;
`;
const UserImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border-radius: 100%;
`;
const UserName = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  letter-spacing: 3px;
  text-align: center;
  span {
    font-size: 15px;
    font-weight: normal;
  }
  display: flex;
  justify-content: center;
  align-items: end;
`;

const FavoriteContainer = styled.div`
  width: 100%;
  height: calc(100% - 220px);
  background-color: #fff;
  position: absolute;
  top: 220px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  padding-left: 15px;
  margin-top: 25px;
`;

const FavoriteButton = styled.div`
  width: 330px;
  height: 85px;
  border: 1px solid #dadada;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
`;

const StyledLink = styled(Link)`
  width: 220px;
  height: 60px;
  text-decoration: none;
  border-right: 1px solid #dadada;
  &:last-child {
    border-right: none;
  }
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.img``;

const Text = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  text-decoration: none;
  margin: 5px;
  text-align: center;
`;

const ProfileEditButton = styled.div`
  width: 100%;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  margin-top: 25px;
`;

const EditList = styled.div`
  width: 100%;
  margin: 15px 0;
  padding: 5px 20px;
`;

const EditLink = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 18px;
`;

const EditText = styled.p`
  font-size: 14px;
  color: #666666;
  text-decoration: none;
  margin: 5px;
  text-align: center;
`;

const UserPage = () => {
  const setUserInfo = useSetRecoilState(userInformationState);
  const setNavigationState = useSetRecoilState(navigationState);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchMemebers,
    cacheTime: 0,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const navigate = useNavigate();

  const { id, nickname, profile } = data?.data.data || {};

  useEffect(() => {
    setUserInfo({
      id: id,
      nickName: nickname,
      profileImage: profile,
    });
  }, [data, setUserInfo]);

  const handleGoEdit = () => {
    console.log("edit");
    navigate("/mypage/updateprofile");
  };
  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    navigate("/");
    setNavigationState("Home");
  };

  return (
    <Container>
      <UserContainer>
        {isLoading ? (
          <>회원 정보 불러오는 중 </>
        ) : (
          <>
            <UserProfile>
              <UserProfileInner>
                <UserImgBox>
                  <UserImg src={profile} size={100} />
                </UserImgBox>
                <UserName>
                  {nickname}
                  <span>님</span>
                </UserName>
              </UserProfileInner>
            </UserProfile>
          </>
        )}
      </UserContainer>
      <FavoriteContainer>
        <Title>즐겨찾기</Title>
        <FavoriteButton>
          {/* <StyledLink to="/mypage/favoriteslocation">
            <IconBox>
              <Icon
                src={LocationIcon}
                alt="location icon"
                style={{ width: 22 }}
              />
            </IconBox>
            <Text>장소</Text>
          </StyledLink> */}
          <StyledLink to="/mypage/favoritestraffic">
            <IconBox>
              <Icon src={TrafficIcon} alt="TrafficIcon" style={{ width: 19 }} />
            </IconBox>
            <Text>신호등</Text>
          </StyledLink>
          <StyledLink to="/mypage/favoritesroute">
            <IconBox>
              <Icon src={RouteIcon} alt="RouteIcon" style={{ width: 33 }} />
            </IconBox>
            <Text>경로</Text>
          </StyledLink>
        </FavoriteButton>
        <ProfileEditButton>
          <Title>프로필 관리</Title>
          <EditList>
            <EditLink onClick={handleGoEdit}>
              <Icon
                src={EditUserButton}
                alt="EditUserButton"
                style={{ width: 19 }}
              />
              <EditText>회원 정보 수정</EditText>
            </EditLink>
          </EditList>
          <EditList>
            <EditLink onClick={handleLogout}>
              <Icon
                src={LogoutButton}
                alt="LogoutButton"
                style={{ width: 19 }}
              />
              <EditText>로그아웃</EditText>
            </EditLink>
          </EditList>
        </ProfileEditButton>
      </FavoriteContainer>
    </Container>
  );
};

export default UserPage;
