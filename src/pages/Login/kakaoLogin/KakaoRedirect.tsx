import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { authInstance } from '../../../api/api';
import styled from 'styled-components';

const refreshAccessToken = async () => {
  const refreshToken = window.localStorage.getItem('refresh_Token');
  // 로컬스토리지에서 refresh_Token을 가져옴

  try {
    const res = await authInstance.post(
      `/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    // /refresh api로 백엔드 서버에 리프레시 토큰을 포함해 요청을 보내고
    // 요청이 성공한다면 서버에서 새로운 액세스 토큰을 응답으로 반환

    if (res.status !== 200) {
      throw new Error('엑세스 토큰 새로고침에 실패하였습니다');
    }
    // 응답 상태가 200이 아닌 경우, 액세스 토큰 갱신 실패를 나타내는 오류를 발생.

    window.localStorage.setItem('access_Token', res.data.accessToken);
    return res.data.accessToken;
    // 액세스 토큰 새로고침에 성공한 경우, 로컬 스토리지에 저장
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력
  } catch (err) {
    console.error('엑세스 토큰 새로고침에 실패하였습니다', err);
    // 여기에 로그인으로 리다이렉트 시키는 로직 작성 (에러처리)
  }
};

const setAxiosInterceptors = () => {
  // authInstance에 대한 응답 인터셉터
  authInstance.interceptors.response.use(
    (res) => res,
    // 응답이 성공한 경우, 응답을 그대로 반환
    async (error) => {
      const originalRequest = error.config;
      if (error.res.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // error.config를 사용하여 실패한 요청의 설정을 가져옴.
        // 만약 오류 응답의 상태 코드가 401이고, 이전에 재시도하지 않았다면, _retry 플래그를 true로 설정하여 재시도.
        const newAccessToken = await refreshAccessToken();
        // `refreshAccessToken` 함수를 호출하여 새 액세스 토큰을 받아옵니다.
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return authInstance(originalRequest);
      }
      return Promise.reject(error);
    },
  );
};

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
        //여기에 리다이렉트 로직 추가
        return res;
      });
  }, [CODE]);

  useEffect(() => {
    setAxiosInterceptors();
    // 컴포넌트 마운트 시 interceptor 실행
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
