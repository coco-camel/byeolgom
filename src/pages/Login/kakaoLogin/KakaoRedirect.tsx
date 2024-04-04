import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { authInstance } from '../../../api/api';
import styled from 'styled-components';

function KakaoRedirect() {
  const location = useLocation();
  const CODE = location.search.split('=')[1];
  console.log(CODE);

  const sendAuthorizationCode = useCallback(() => {
    authInstance
      .post(`/kakao`, {
        code: CODE,
      })
      .then((res) => {
        window.localStorage.setItem('access_Token', res.data.accessToken);
        window.localStorage.setItem('refresh_Token', res.data.refreshToken);
        return res;
      });
  }, [CODE]);

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
