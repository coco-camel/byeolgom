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
    <LoginButtonContainer>
      <LoginWrapper>
        <KakaoLogin />
        <NaverLogin />
      </LoginWrapper>
    </LoginButtonContainer>
  );
}

export default LoginPage;

const LoginButtonContainer = styled.div`
  position: relative;
`;

const LoginWrapper = styled.div`
  margin-top: 100%;
  display: block;
  white-space: nowrap;
  align-items: center;
`;
