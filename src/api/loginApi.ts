import axios from 'axios';
import { authInstance } from './api';

export interface UserStateRes {
  email: string;
  nickname: string;
}

export const tokenHandler = (accessToken: string, refreshToken?: string) => {
  // 토큰 로컬 스토리지에 저장
  window.localStorage.setItem('access_token', accessToken);
  if (refreshToken) {
    window.localStorage.setItem('refresh_token', refreshToken);
  }
};

export const setClientHeader = (accessToken: string) => {
  authInstance.defaults.headers.common['Authorization'] =
    `Bearer%20${accessToken}`;
};

export const resetHeader = () => {
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');
  authInstance.defaults.headers.common = {};
};

/** refresh token으로 access token 재발급 */
export const getNewAccessToken = async () => {
  // 헤더에 리프레쉬 토큰 삽입
  const refreshToken = `Bearer%20${window.localStorage.getItem(
    'refresh_token',
  )}`;

  const response = await axios.get(
    `${import.meta.env.VITE_STARBEAR_SERVER_URL}/refreshtoken`,
    {
      headers: {
        Refreshtoken: refreshToken,
      },
    },
  );
  return response;
};
