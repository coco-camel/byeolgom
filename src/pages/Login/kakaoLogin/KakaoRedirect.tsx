import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authInstance } from '../../../api/api';
import { useAuthStore } from '../../../store/authStore';
import styled from 'styled-components';

function KakaoRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoginState } = useAuthStore();

  const CODE = new URLSearchParams(location.search).get('code');
  console.log('인가코드 ========', CODE);

  const sendAuthorizationCode = useCallback(() => {
    authInstance
      .post(`/kakao`, {
        code: CODE,
      })
      .then((res) => {
        setLoginState(res.data.accessToken, res.data.refreshToken);
        window.localStorage.setItem('access_Token', res.data.accessToken);
        window.localStorage.setItem('refresh_Token', res.data.refreshToken);
        navigate('/');
        console.log('카카오 로그인에 성공하였습니다.');
      })
      .catch((err) => {
        console.error('카카오 로그인에 실패하였습니다.', err);
      });
  }, [CODE, navigate, setLoginState]);

  useEffect(() => {
    if (location.search) {
      sendAuthorizationCode();
    }
  }, [location.search, sendAuthorizationCode]);

  return <RedirectContainer>카카오 Redirect 페이지입니다</RedirectContainer>;
}

export default KakaoRedirect;

const RedirectContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 340px;
  font-weight: 500;
`;
