import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PastContentAnimation from '../PastContent/PastContentAnimation';
import MyElement3D from '../../components/3dMotion/MyElement3D';

function Main() {
  return (
    <>
      <MainPage>
        <p className="title">MainPage</p>
        <Link to={'/login'}>로그인이동</Link>
        <PastContentAnimation />
        <MyElement3D />
      </MainPage>
    </>
  );
}

export default Main;

const MainPage = styled.div`
  margin-left: 30px;

  .title {
    font-weight: bold;
    font-size: 24px;
    margin-top: 250px;
  }
`;
