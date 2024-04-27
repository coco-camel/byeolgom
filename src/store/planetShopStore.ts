import { create } from 'zustand';

export interface PlanetShopState {
  planetsState: string[];
  setPlanetsState: (items: string[]) => void;
  setAddPlanets: (item: string) => void;
}

export const usePlanetShopStore = create<PlanetShopState>((set) => ({
  planetsState: [],

  setPlanetsState: (items) =>
    set(() => ({
      planetsState: items,
    })),
  setAddPlanets: (item) => {
    set((state) => ({
      planetsState: [...state.planetsState, item],
    }));
  },
}));
