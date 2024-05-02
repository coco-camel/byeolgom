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
    set((state) => {
      if (state.initialLoad) {
        return { updateChatList: items, initialLoad: false };
      }
      return state;
    });
  },

  setChatEntered: (roomId) =>
    set((state) => {
      let isUpdate = false;
      const updatedList = state.updateChatList.map((item) => {
        if (item.roomId === roomId && item.hasEntered === true) {
          isUpdate = true;
          return { ...item, hasEntered: false };
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
      let isUpdate = false;
      const updatedList = state.updateChatList.map((item) => {
        if (item.roomId === roomId && item.isAccepted === true) {
          isUpdate = true;
          return { ...item, isAccepted: false };
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
