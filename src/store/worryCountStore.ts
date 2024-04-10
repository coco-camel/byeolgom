import { create } from 'zustand';

interface WorryCountState {
  worryCount: number;
  setWorryCountState: (count: number) => void;
}

export const useWorryCountStore = create<WorryCountState>((set) => ({
  worryCount: 0,

  setWorryCountState: (count: number) =>
    set(() => ({
      worryCount: count,
    })),
}));
