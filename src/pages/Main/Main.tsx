import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import PastContentAnimation from '../PastContent/PastContentAnimation';
import MyElement3D from '../../components/3dMotion/MyElement3D.jsx';
import styled from 'styled-components';

function Main() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

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
  color: white;

  .title {
    font-weight: bold;
    font-size: 24px;
    margin-top: 250px;
  }
`;
