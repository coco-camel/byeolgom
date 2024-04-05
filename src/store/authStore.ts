import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  setLoginState: () => void;
  setLogoutState: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  setLoginState: () =>
    set(() => ({
      isLoggedIn: true,
    })),

  setLogoutState: () =>
    set(() => ({
      isLoggedIn: false,
    })),
}));

function initializeUser() {
  const accessToken = localStorage.getItem('access_Token');
  accessToken
    ? useAuthStore.getState().setLoginState()
    : useAuthStore.getState().setLogoutState();
}

initializeUser();
