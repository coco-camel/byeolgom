import PostArrived from '../../components/postArrived/PostArrived.tsx';
import MyElement3D from '../../components/3dMotion/MyElement3D.tsx';
import MainPageButton from '../../components/button/MainPageButton.tsx';

function Main() {
  return (
    <>
      <PostArrived />
      <MyElement3D />
      <MainPageButton link="/howto" />
      <MainPageButton link="/planetshop" item="shop" />
    </>
  );
}

export default Main;
