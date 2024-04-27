import { create } from 'zustand';

export interface PlanetShopState {
  darkMode: boolean;
  planet: string;
  setUsersState: (items: PlanetShopState) => void;
  toggleDarkMode: () => void;
  setChangePlanet: (item: string) => void;
}

export const userStateStore = create<PlanetShopState>((set) => ({
  darkMode: true,
  planet: '',

  setUsersState: (items) =>
    set(() => ({
      darkMode: items.darkMode,
      planet: items.planet,
    })),
  toggleDarkMode: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),
  setChangePlanet: (item) =>
    set(() => ({
      planet: item,
    })),
}));
