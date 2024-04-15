import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_STARBEAR_SERVER_URL,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_STARBEAR_SERVER_URL,
});

authInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_Token');
    if (accessToken) {
      config.headers['Authorization'] = `${accessToken}`;
    } else {
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => Promise.reject(error),
);

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `${newAccessToken}`;
          return authInstance(originalRequest);
        } else {
          localStorage.removeItem('access_Token');
          localStorage.removeItem('refresh_Token');
          location.href = '/login';
        }
      } catch (refreshError) {
        localStorage.removeItem('access_Token');
        localStorage.removeItem('refresh_Token');
        location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const refreshAccessToken = async () => {
  const refreshToken = window.localStorage.getItem('refresh_Token');
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 필요합니다.');
  }
  try {
    const res = await authInstance.post(`/refresh`, {
      headers: {
        Authorization: refreshToken,
      },
    });
    localStorage.setItem('access_Token', res.data.accessToken);
    localStorage.setItem('refresh_Token', res.data.refreshToken);
    return res.data.accessToken;
  } catch (err) {
    console.error('엑세스 토큰 새로고침에 실패하였습니다', err);
    throw err;
  }
};
