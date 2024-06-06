import styled from "styled-components";
import recentPlace from "../../assets/icon/recentPlaceIcon.webp";

const MainContainer = styled.div`
  border-top: 5px solid ${(props) => props.theme.gray};
  margin-bottom: 10px;
  height: 55%;
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
  flex: 1.3636;
`;

const RecentListBox = styled.div`
  display: flex;
  flex-direction: column;
  //background-color: gray;
  padding: 0 10px;
  flex: 8.6364;
  overflow-y: auto;
`;

const RecentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 50px;
  border-bottom: 2px solid ${(props) => props.theme.gray};
`;

const RecentIcon = styled.button`
  background-image: url(${recentPlace});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  margin-left: 10px;
  width: 25px;
  height: 25px;
`;

const RecentPath = () => {
  const recentPlaces = [
    "광주역",
    "전남대학교 공과대학7호관",
    "광주기아챔피언스필드",
    "스타벅스 전남대점",
    "써브웨이광주전남대후문점",
    "광주광역시청",
    "전남대학교 광주캠퍼스 정문",
    "전남대학교 여수캠퍼스",
    "광주송정역",
  ]; // API 호출로 변경

  return (
    <MainContainer>
      <TitleBox>최근 경로</TitleBox>
      <RecentListBox>
        {recentPlaces.map((recentPlaces, index) => (
          <RecentItem key={index}>
            <RecentIcon />
            {recentPlaces}
          </RecentItem>
        ))}
      </RecentListBox>
    </MainContainer>
  );
};
export default RecentPath;
