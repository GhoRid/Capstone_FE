import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MyPage from "./pages/MyPage/MyPage";
import PathPage from "./pages/PathPage/PathPage";
import PathSearchPage from "./pages/PathPage/PathSearchPage/PathSearchPage";
import FavoritesLocationPage from "./pages/FavoritesLocationPage/FavoritesLocationPage";
import FavoritesTrafficPage from "./pages/FavoritesTrafficPage/FavoritesTrafficPage";
import FavoritesRoutePage from "./pages/FavoritesRoutePage/FavoritesRoutePage";
import UserProfileUpdate from "./pages/UpdatePage/UserProfileUpdate";
import KakaoRedirect from "./shared/KakaoRedirect";
import DirectionPage from "./pages/PathPage/DirectionPage/DirectionPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/trafficlights" element={<HomePage />}></Route>{" "}
        <Route path="/favorites" element={<HomePage />}></Route>{" "}
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/mypage/favoriteslocation" element={<FavoritesLocationPage />}></Route>
        <Route path="/mypage/favoritestraffic" element={<FavoritesTrafficPage />}></Route>
        <Route path="/mypage/favoritesroute" element={<FavoritesRoutePage />}></Route>
        <Route path="/mypage/updateprofile" element={<UserProfileUpdate />}></Route>
        <Route path="/path" element={<PathPage />}></Route>
        <Route path="/oauth/kakao/callback" element={<KakaoRedirect />}></Route>
        <Route path="/pathsearch" element={<PathSearchPage />}></Route>
        <Route path="/direction" element={<DirectionPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
