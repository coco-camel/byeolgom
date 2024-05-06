import { create } from 'zustand';

interface ModalState {
  statusMessage: string;
  modalOpen: boolean;
  checkbox: boolean;
  openStateModal: (message: string, check?: boolean) => void;
  closeStateModal: () => void;
}

export const useStateModalStore = create<ModalState>((set) => ({
  statusMessage: '',
  modalOpen: false,
  checkbox: false,
  openStateModal: (message: string, check?: boolean) => {
    set({ statusMessage: message, modalOpen: true, checkbox: check });
  },
  closeStateModal: () =>
    set({ statusMessage: '', modalOpen: false, checkbox: false }),
}));
