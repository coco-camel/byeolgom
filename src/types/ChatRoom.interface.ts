export interface ChatRoom {
  roomId: number;
  icon: string;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  commentAuthorId: number;
  worryId: number;
  comment_lastContent?: string;
  isRead: boolean;
  hasEntered: boolean;
  status: string;
  isSolved: boolean;
  isOwner: boolean;
}
