import { create } from 'zustand';
import { ChatRoom } from '../types/ChatRoom.interface';

export interface ChatListState {
  updateChatList: ChatRoom[];
  initialLoad: boolean;
  setChatListState: (items: ChatRoom[]) => void;
  setChatEntered: (roomId: number) => void;
  setChatAccepted: (roomId: number) => void;
  setChatDelete: (roomId: number) => void;
}

export const useChatListStore = create<ChatListState>((set) => ({
  updateChatList: [],
  initialLoad: true,
  setChatListState: (items) => {
    set((state) => ({
      ...state,
      updateChatList: items,
      initialLoad: false,
    }));
  },

  setChatEntered: (roomId) =>
    set((state) => {
      let isUpdate = true;
      const updatedList = state.updateChatList.map((item) => {
        if (item.roomId === roomId && item.hasEntered === false) {
          isUpdate = false;
          return { ...item, hasEntered: true };
        }
        return item;
      });
      if (isUpdate) {
        return { updateChatList: updatedList };
      }
      return state;
    }),

  setChatAccepted: (roomId) =>
    set((state) => {
      let isUpdate = true;
      const updatedList = state.updateChatList.map((item) => {
        if (item.roomId === roomId && item.isAccepted === false) {
          isUpdate = false;
          return { ...item, isAccepted: true };
        }
        return item;
      });
      if (isUpdate) {
        return { updateChatList: updatedList };
      }
      return state;
    }),

  setChatDelete: (roomId) =>
    set((state) => {
      const updatedList = state.updateChatList.filter(
        (item) => item.roomId !== roomId,
      );
      return { updateChatList: updatedList };
    }),
}));
