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
      <LoginTitle>
        <span>별별고민</span>
        <h2>별곰</h2>
      </LoginTitle>
      <img className="Logo" src={mainImg} />
      <LoginButtonContainer>
        <KakaoLogin />
        <NaverLogin />
      </LoginButtonContainer>
    </LoginContainer>
  );
}

export default LoginPage;
const LoginTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  top: 10%;
  :nth-child(1) {
    font-family: 'PyeongChangPeace-Light';
    font-size: 20px;
    color: #fed56b;
  }
  h2 {
    font-family: 'PyeongChangPeace-Bold';
    font-weight: bold;
    margin-top: 5px;
    font-size: 53px;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-bottom: 10%;
  box-sizing: border-box;
  position: absolute;
  div span {
    font-size: 16px;
    font-weight: bold;
    color: #f7f7f7;

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
    top: 32%;
  }
`;
const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 15%;
`;
