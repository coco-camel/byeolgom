import create, { SetState } from 'zustand';

interface PastContentList {
  name: string;
  content: string;
  date: Date;
}

interface PastContentState {
  PastContents: PastContentList[];
  getPastContentsList: () => void;
}

const usePastContentStore = create<PastContentState>(
  (set: SetState<PastContentState>) => ({
    PastContents: [],
    getPastContentsList: () => {
      set((state) => ({
        ...state,
      }));
    },
  }),
);

export default usePastContentStore;
