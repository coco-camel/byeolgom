export interface WorryDetail {
  commentId: number;
  content: string;
  createdAt: Date;
  fontColor: string;
  icon: string;
  parentId: number;
  parentContent: string;
  unRead: boolean;
  worryId: number;
  userId: number;
  worryUserId: number;
  isSolved: boolean;
}
