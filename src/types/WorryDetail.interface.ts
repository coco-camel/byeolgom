export interface WorryDetail {
  commentId: number;
  content: string;
  createdAt: Date;
  fontColor: string;
  icon: string;
  parentId: number;
  unRead: boolean;
  worryId: number;
  userId: number;
  worryUserId: number;
  isSolved: boolean;
}
