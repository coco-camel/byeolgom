import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { authInstance } from '../../../api/api';
import styled from 'styled-components';

function NaverRedirect() {
  const location = useLocation();
  const CODE = location.search.split('=')[1];
  console.log(CODE);

  const sendAuthorizationCode = useCallback(() => {
    authInstance
      .post(`/naver`, {
        code: CODE,
      })
      .then((res) => console.log(res));
  }, [CODE]);

  useEffect(() => {
    if (location.search) {
      sendAuthorizationCode();
    }
  }, [location.search, sendAuthorizationCode]);

  return <RedirectContainer>네이버 Redirect 페이지입니다</RedirectContainer>;
}

export default NaverRedirect;

const RedirectContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 340px;
  font-weight: 500;
`;
