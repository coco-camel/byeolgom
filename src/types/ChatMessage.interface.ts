export interface ChatMessage {
  chatId?: number;
  userId: number;
  senderId?: number;
  text: string;
  isRead?: boolean;
  createdAt: Date;
}
