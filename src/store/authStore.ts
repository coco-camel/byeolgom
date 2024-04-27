import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  setLoginState: () => void;
  setLogoutState: () => void;
  userId: number | null;
  setUserId: (id: number | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userId: null,

  setLoginState: () =>
    set(() => ({
      isLoggedIn: true,
    })),

  setLogoutState: () =>
    set(() => ({
      isLoggedIn: false,
    })),

  setUserId: (id) => set({ userId: id }),
}));

function initializeUser() {
  const accessToken = localStorage.getItem('access_Token');
  accessToken
    ? useAuthStore.getState().setLoginState()
    : useAuthStore.getState().setLogoutState();
}

initializeUser();
