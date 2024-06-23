import styled from "styled-components";

const MainContainer = styled.div`
  border-top: 5px solid ${(props) => props.theme.gray};
  margin-bottom: 10px;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;

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
  flex: 7;
  overflow-y: auto;
`;

const FavoriteList = () => {
  return (
    <MainContainer>
      <TitleBox>내 즐겨찾기 경로</TitleBox>
      <FavoriteListBox></FavoriteListBox>
    </MainContainer>
  );
};
export default FavoriteList;
