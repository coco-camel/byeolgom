import { create } from 'zustand';

interface UserInfoState {
  token: string | null;
  userId: number | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: number | null) => void;
}

const useInfoStore = create<UserInfoState>((set) => ({
  token: localStorage.getItem('access_Token'),
  userId: null,
  setToken: (token) => set({ token }),
  setUserId: (userId) => set({ userId }),
}));

export default useInfoStore;
