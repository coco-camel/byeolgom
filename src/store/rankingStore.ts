import { create } from 'zustand';

interface RankingStoreState {
  currentUser: number | null;
  isCurrentUser: (userId: number) => boolean;
  setCurrentUser: (users: Array<{ userId: number }>) => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const rankingStore = create<RankingStoreState>((set, get) => ({
  currentUser: null,

  isCurrentUser: (userId) => {
    const currentUser = get().currentUser;
    return userId === currentUser;
  },
  setCurrentUser: (users) => {
    const lastUser = users[users.length - 1];
    set({ currentUser: lastUser.userId });
  },

  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
