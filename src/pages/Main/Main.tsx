import { useNavigate } from 'react-router-dom';
import { startTransition, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import PastContentAnimation from '../PastContent/PastContentAnimation';
import MyElement3D from '../../components/3dMotion/MyElement3D.jsx';
import styled from 'styled-components';

function Main() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      startTransition(() => {
        navigate('/login');
      });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <MainPage>
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
