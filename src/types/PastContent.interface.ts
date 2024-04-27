export interface PastContent extends Comment {
  worryId: number;
  icon: string;
  content: string;
  createdAt: Date;
  comments: Comment[];
  isSolved: boolean;
  hasReports: boolean;
  deletedAt?: Date;
}
interface Comment {
  content: string;
  updatedAt: Date;
}
