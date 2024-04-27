import { create } from 'zustand';

export interface PlanetShopState {
  planet: string;
  setUsersState: (item: string) => void;
  setChangePlanet: (item: string) => void;
}

export const userStateStore = create<PlanetShopState>((set) => ({
  planet: '',

  setUsersState: (item) =>
    set(() => ({
      planet: item,
    })),

  setChangePlanet: (item) =>
    set(() => ({
      planet: item,
    })),
}));
