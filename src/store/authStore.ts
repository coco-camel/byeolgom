import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setLoginState: (accessToken: string, refreshToken: string) => void;
  setLogoutState: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  // 초기 상태 (로그아웃된 상태)

  setLoginState: (accessToken: string, refreshToken: string) =>
    set((state) => ({
      ...state,
      isLoggedIn: true,
      accessToken,
      refreshToken,
    })),
  // 로그인 상태 : 액세스 토큰과 리프레시 토큰을 받아 상태를 변경

  setLogoutState: () =>
    set((state) => ({
      ...state,
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
    })),
  // 로그아웃 상태 : 모든 토큰을 null로 설정, isLoggedIn을 false로 변경
}));
