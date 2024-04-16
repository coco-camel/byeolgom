import { create } from 'zustand';

interface ModalState {
  statusMessage: string;
  modalOpen: boolean;
  openStateModal: (message: string) => void;
  closeStateModal: () => void;
}

export const useStateModalStore = create<ModalState>((set) => ({
  statusMessage: '',
  modalOpen: false,
  openStateModal: (message: string) => {
    set({ statusMessage: message, modalOpen: true });
  },
  closeStateModal: () => set({ statusMessage: '', modalOpen: false }),
}));
