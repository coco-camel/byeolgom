import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authInstance } from '../../../api/api';
import { useAuthStore } from '../../../store/authStore';
import Spinner from '/assets/images/Spinner.gif';
import styled from 'styled-components';

function NaverRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoginState } = useAuthStore();

  const CODE = new URLSearchParams(location.search).get('code');

  const sendAuthorizationCode = useCallback(() => {
    authInstance
      .post(`/naver`, {
        code: CODE,
      })
      .then((res) => {
        setLoginState();
        window.localStorage.setItem('access_Token', res.data.accessToken);
        window.localStorage.setItem('refresh_Token', res.data.refreshToken);
        navigate('/');
      })
      .catch((err) => {
        console.error('네이버 로그인에 실패하였습니다.', err);
      });
  }, [CODE, navigate, setLoginState]);

  useEffect(() => {
    if (location.search) {
      sendAuthorizationCode();
    }
  }, [location.search, sendAuthorizationCode]);

  return (
    <RedirectContainer>
      <img src={Spinner} alt="로딩" width="10%" />
    </RedirectContainer>
  );
}

export default NaverRedirect;

const RedirectContainer = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  margin-top: 340px;
  font-weight: 500;
`;
