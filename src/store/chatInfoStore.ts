import create from 'zustand';

export interface ChatInfoState {
  roomId: number;
  worryId: number;
  isSolved: boolean;
  setRoomId: (id: number) => void;
  setWorryId: (id: number) => void;
  setIsSolved: (solved: boolean) => void;
}

export const useChatInfoStore = create<ChatInfoState>((set) => ({
  roomId: 0,
  worryId: 0,
  isSolved: false,
  setRoomId: (id) => set(() => ({ roomId: id })),
  setWorryId: (id) => set(() => ({ worryId: id })),
  setIsSolved: (solved) => set(() => ({ isSolved: solved })),
}));
