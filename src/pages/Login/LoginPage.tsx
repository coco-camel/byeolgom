import KakaoLogin from './kakaoLogin/KakaoLogin';
import NaverLogin from './naverLogin/NaverLogin';
import styled from 'styled-components';

function LoginPage() {
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
