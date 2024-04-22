import { create } from 'zustand';

interface WhoseContentState {
  whoseContent: string;
  setWhoseContentState: (content?: string) => void;
}

export const useWhoseContentStore = create<WhoseContentState>((set) => ({
  whoseContent: 'mySolvedWorry',

  setWhoseContentState: (content) =>
    set(() => ({
      whoseContent: content,
    })),
}));
