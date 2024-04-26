import PostArrived from '../../components/postArrived/PostArrived.tsx';
import MyElement3D from '../../components/3dMotion/MyElement3D.tsx';
import MainPageButton from '../../components/button/MainPageButton.tsx';
import { refreshAccessToken } from '../../api/api.ts';

function Main() {
  refreshAccessToken();
  return (
    <>
      <PostArrived />
      <MyElement3D />
      {/* <MainPageButton $link="/!" /> */}
      <MainPageButton link="/planetshop" item="shop" />
    </>
  );
}

export default Main;
