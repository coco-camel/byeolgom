export interface PastContent extends Comment {
  worryId: number;
  icon: string;
  content: string;
  createdAt: Date;
  comments: Comment[];
}
interface Comment {
  content: string;
  updatedAt: Date;
}
