import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_STARBEAR_SERVER_URL,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_STARBEAR_SERVER_URL,
});

authInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return authInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

const refreshAccessToken = async () => {
  const refreshToken = window.localStorage.getItem('refresh_Token');

  try {
    const res = await authInstance.post(
      `/refresh`,
      {},
      {
        headers: {
          Authorization: `${refreshToken}`,
        },
      },
    );
    window.localStorage.setItem('access_Token', res.data.accessToken);
    window.localStorage.setItem('refresh_Token', res.data.refreshToken);
    return res.data.accessToken;
  } catch (err) {
    console.error('엑세스 토큰 새로고침에 실패하였습니다', err);
    throw err;
  }
};

authInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `${newAccessToken}`;
        return authInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
