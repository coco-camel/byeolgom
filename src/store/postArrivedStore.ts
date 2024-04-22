import { create } from 'zustand';
import { PostArrivedItem } from '../types/PostArrivedItem.interface';
import { useStateModalStore } from './stateModalStore';

interface PostArrivedItemState {
  postArrivedList: PostArrivedItem[];
  initialLoad: boolean;
  setPostArrivedListState: (items: PostArrivedItem[]) => void;
  setPostArrivedAsRead: (worryId: number) => void;
  setRemovePostArrived: (worryId: number) => void;
}

export const usePostArrivedStore = create<PostArrivedItemState>((set) => ({
  postArrivedList: [],
  initialLoad: true,
  setPostArrivedListState: (items) => {
    set((state) => {
      if (
        !state.initialLoad &&
        state.postArrivedList !== items &&
        state.postArrivedList.length < items.length
      ) {
        useStateModalStore
          .getState()
          .openStateModal('새로운 로켓이 도착했어요');
        return { postArrivedList: items, initialLoad: false };
      }
      if (state.initialLoad) {
        return { postArrivedList: items, initialLoad: false };
      }
      return state;
    });
  },

  setPostArrivedAsRead: (worryId) =>
    set((state) => {
      let isUpdate = false;
      const updatedList = state.postArrivedList.map((item) => {
        if (item.worryId === worryId && item.unRead === true) {
          isUpdate = true;
          return { ...item, unRead: false };
        }
        return item;
      });
      if (isUpdate) {
        return { postArrivedList: updatedList };
      }
      return state;
    }),

  setRemovePostArrived: (worryId) =>
    set((state) => {
      const updatedList = state.postArrivedList.filter(
        (item) => item.worryId !== worryId,
      );
      return { postArrivedList: updatedList };
    }),
}));
