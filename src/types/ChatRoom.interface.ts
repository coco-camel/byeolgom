export interface ChatRoom {
  roomId: number;
  createdAt: Date;
  updatedAt: Date;
  userIds?: string;
  worryId: number;
  comment_lastContent?: string;
  unRead: boolean;
  status: string;
  isSolved: boolean;
}
