export interface ChatRoom {
  roomId: number;
  icon: string;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userIds?: string;
  worryId: number;
  comment_lastContent?: string;
  isRead: boolean;
  hasEntered: boolean;
  status: string;
  isSolved: boolean;
  isOwner: boolean;
}
