export interface CommentInterface {
  id: number;
  created: string;
  content: string;
  user: {
    username: string;
  };
}
