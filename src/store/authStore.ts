import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  setLoginState: () => void;
  setLogoutState: () => void;
  userId: number | null;
  userPlanet: string | null;
  setUserId: (id: number | null) => void;
  setUserPlanet: (planet: string | null) => void;
}
interface CustomJwtPayload {
  planet: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userId: null,
  userPlanet: null,

  setLoginState: () =>
    set(() => ({
      isLoggedIn: true,
    })),

  setLogoutState: () =>
    set(() => ({
      isLoggedIn: false,
    })),

  setUserId: (id) => set({ userId: id }),
  setUserPlanet: (planet) => set({ userPlanet: planet }),
}));

function initializeUser() {
  const accessToken = localStorage.getItem('access_Token');
  accessToken
    ? useAuthStore.getState().setLoginState()
    : useAuthStore.getState().setLogoutState();
  if (accessToken) {
    const decoded: CustomJwtPayload = jwtDecode(accessToken.slice(7));
    useAuthStore.getState().setUserPlanet(decoded.planet);
    console.log(decoded.planet);
  }
}

initializeUser();
