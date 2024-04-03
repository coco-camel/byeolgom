import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PastContentAnimation from '../PastContent/PastContentAnimation';

function Main() {
  return (
    <>
      <MainPage>
        <p className="title">MainPage</p>
        <Link to={'/login'}>로그인이동</Link>
        <PastContentAnimation />
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
