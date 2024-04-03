import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_STARBEAR_SERVER_URL,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_STARBEAR_SERVER_URL,
});

// 요청 인터셉터를 설정합니다. 이 인터셉터는 HTTP 요청을 보내기 전에 실행됩니다.
authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    // 로컬 스토리지에서 'accessToken'을 가져옵니다.
    if (token) {
      config.headers['Authorization'] = `${token}`;
      // 토큰이 있으면 요청 헤더에 'Authorization'을 설정합니다.
    }
    return config;
    // 수정된 설정을 반환합니다.
  },
  (error) => {
    console.error(error);
    // 요청 인터셉터에서 오류가 발생하면 콘솔에 기록합니다.
    return Promise.reject(error);
    // 오류를 반환하여 체인의 다음 프로미스에 전달합니다.
  },
);

// 응답 인터셉터를 설정합니다. 이 인터셉터는 HTTP 응답을 받은 후에 실행됩니다.
authInstance.interceptors.response.use(
  (response) => response,
  // 응답이 성공적이면 그대로 응답을 반환합니다.
  async (error) => {
    const originalRequest = error.config;
    // 오류가 발생한 요청의 설정을 가져옵니다.
    if (
      error.response.status === 401 &&
      // 응답 코드가 401(인증 실패)이고
      !originalRequest._retry
      // 이 요청이 재시도된 요청이 아니라면
    ) {
      try {
        // 새로운 액세스 토큰을 요청합니다.
        const response = await instance.post('/api/v1/members/reissue');
        const accessToken = response.headers['authorization'];
        // 응답 헤더에서 새 토큰을 가져옵니다.

        localStorage.setItem('accessToken', accessToken);
        // 새 토큰을 로컬 스토리지에 저장합니다.
        originalRequest.headers['authorization'] = `${accessToken}`;
        // 오류가 발생한 요청의 헤더를 수정합니다.

        return authInstance(originalRequest);
        // 수정된 요청을 다시 보냅니다.
      } catch (refreshError) {
        return Promise.reject(refreshError);
        // 토큰 재발급 요청에서 오류가 발생하면 오류를 반환합니다.
      }
    }
    return Promise.reject(error);
    // 다른 모든 오류는 그대로 반환합니다.
  },
);
