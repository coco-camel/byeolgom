import { create } from 'zustand';

interface StarCountState {
  starCount: number;
  setStarCountState: (count: number) => void;
  setDeleteStarCount: (count: number) => void;
}

export const useStarCountStore = create<StarCountState>((set) => ({
  starCount: 0,

  setStarCountState: (count) =>
    set(() => ({
      starCount: count,
    })),
  setDeleteStarCount: (count) =>
    set((state) => ({
      starCount: state.starCount - count,
    })),
}));
