import { create } from 'zustand';
import { PostArrivedItem } from '../types/PostArrivedItem.interface';
import { isEqual } from 'lodash';

interface PostArrivedItemState {
  postArrivedList: PostArrivedItem[];
  setPostArrivedListState: (items: PostArrivedItem[]) => void;
  setPostArrivedAsRead: (worryId: number) => void;
  setRemovePostArrived: (worryId: number) => void;
}

export const usePostArrivedStore = create<PostArrivedItemState>((set) => ({
  postArrivedList: [],

  setPostArrivedListState: (items) =>
    set((state) => {
      if (!isEqual(state.postArrivedList, items)) {
        return { postArrivedList: items };
      }
      return state;
    }),

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
