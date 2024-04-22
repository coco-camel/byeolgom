import { create } from 'zustand';

interface WorryCountState {
  worryCount: number;
  setWorryCountState: (count: number) => void;
  setWorryCounteDcrement: () => void;
}

export const useWorryCountStore = create<WorryCountState>((set) => ({
  worryCount: 0,

  setWorryCountState: (count) =>
    set(() => ({
      worryCount: count,
    })),
  setWorryCounteDcrement: () =>
    set((state) => ({
      worryCount:
        state.worryCount > 0 ? state.worryCount - 1 : state.worryCount,
    })),
}));
