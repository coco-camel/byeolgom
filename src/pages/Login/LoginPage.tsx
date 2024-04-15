import { Navigate } from 'react-router-dom';
import KakaoLogin from './kakaoLogin/KakaoLogin';
import NaverLogin from './naverLogin/NaverLogin';
import { useAuthStore } from '../../store/authStore';
import styled from 'styled-components';
import mainImg from '/assets/images/mainImg.svg';

function LoginPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <LoginContainer>
      <span>별곰</span>
      <img className="Logo" src={mainImg} />
      <LoginButtonContainer>
        <KakaoLogin />
        <NaverLogin />
      </LoginButtonContainer>
    </LoginContainer>
  );
}

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-bottom: 10%;
  box-sizing: border-box;
  position: absolute;
  span {
    font-size: 16px;
    font-weight: bold;
    color: #f7f7f7;
    position: relative;
    top: 15%;
    @media (max-width: 640px) {
      font-size: 1.2rem;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
  img {
    position: absolute;
    width: 40%;
    top: 28%;
  }
`;
const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 15%;
`;
