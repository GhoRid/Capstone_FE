import styled from "styled-components";
import favoritePlace from "../../assets/icon/favoritePlaceIcon.webp";

const MainContainer = styled.div`
  border-top: 5px solid ${(props) => props.theme.gray};
  margin-bottom: 10px;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //background-color: green;
  //gap: 5px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  //background-color: red;
  text-align: left;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 3px solid ${(props) => props.theme.gray};
  padding-left: 20px;
  flex: 3;
`;

const FavoriteListBox = styled.div`
  display: flex;
  flex-direction: column;
  //background-color: gray;
  padding: 0 10px;
  flex: 7;
  overflow-y: auto;
`;

const FavoriteItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 50px;
  border-bottom: 2px solid ${(props) => props.theme.gray};
`;

const FavoriteIcon = styled.button`
  background-image: url(${favoritePlace});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  margin-left: 10px;
  width: 25px;
  height: 25px;
`;

// FavoriteList 서버에서 받아오기

const FavoriteList = () => {
  const favorites = [
    "전남대학교 광주캠퍼스 정문",
    "광주종합터미널",
    "북구청",
    "공과대학 7호관",
    "스타벅스 전남대점",
    "전남대학교 스포츠센터",
  ];

  return (
    <MainContainer>
      <TitleBox>내 즐겨찾기 장소</TitleBox>
      <FavoriteListBox>
        {favorites.map((favorite, index) => (
          <FavoriteItem key={index}>
            <FavoriteIcon />
            {favorite}
          </FavoriteItem>
        ))}
      </FavoriteListBox>
    </MainContainer>
  );
};
export default FavoriteList;
