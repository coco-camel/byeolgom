import PostArrived from '../../components/postArrived/PostArrived.js';
import MyElement3D from '../../components/3dMotion/MyElement3D.jsx';
import styled from 'styled-components';

function Main() {
  return (
    <>
      <MainPage>
        <PostArrived />
        <MyElement3D />
      </MainPage>
    </>
  );
}

export default Main;

const MainPage = styled.div`
  margin-left: 30px;
  color: white;

  .title {
    font-weight: bold;
    font-size: 24px;
    margin-top: 250px;
  }
`;
