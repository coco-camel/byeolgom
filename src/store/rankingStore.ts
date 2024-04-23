import { create } from 'zustand';

interface RankingStoreState {
  currentUser: number | null;
  setCurrentUser: (userId: number | null) => void;
  isCurrentUser: (userId: number) => boolean;
  initializeCurrentUser: (users: Array<{ userId: number }>) => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const rankingStore = create<RankingStoreState>((set, get) => ({
  currentUser: null,
  setCurrentUser: (userId: number | null) => {
    set({ currentUser: userId });
  },
  isCurrentUser: (userId) => {
    const currentUser = get().currentUser;
    return userId === currentUser;
  },
  initializeCurrentUser: (users) => {
    if (users.length > 0) {
      const lastUser = users[users.length - 1];
      set({ currentUser: lastUser.userId });
    }
  },

  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
