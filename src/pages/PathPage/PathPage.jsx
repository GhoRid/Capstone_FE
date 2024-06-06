import NavigationBarLayout from "../../components/NavigationBarLayout";
import SearchingBar from "./SearchingBar";
import FavoriteList from "./FavoriteList";
import RecentPath from "./RecentPath";

const PathPage = () => {
  return (
    <NavigationBarLayout>
      <SearchingBar />
      <FavoriteList />
      <RecentPath />
    </NavigationBarLayout>
  );
};

export default PathPage;
