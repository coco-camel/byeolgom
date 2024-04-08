import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from './kakaoLogin/KakaoLogin';
import NaverLogin from './naverLogin/NaverLogin';
import { useAuthStore } from '../../store/authStore';
import styled from 'styled-components';

function LoginPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [isLoggedIn, navigate]);

  return (
    <LoginContainer>
      <Logo>
        <img className="Logo" src="https://i.ibb.co/tJf5988/image.png" />
      </Logo>
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
  justify-content: center;
  height: 568px;
  width: 100%;
`;

const Logo = styled.div`
  width: 100%;
  text-align: center;

  .Logo {
    width: 100px;
    margin: 0 auto;
  }
`;

const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 200px;
`;
