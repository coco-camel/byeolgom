import { create } from 'zustand';

interface StarCountState {
  starCount: number;
  setStarCountState: (count: number) => void;
}

export const useStarCountStore = create<StarCountState>((set) => ({
  starCount: 0,

  setStarCountState: (count: number) =>
    set(() => ({
      starCount: count,
    })),
}));
