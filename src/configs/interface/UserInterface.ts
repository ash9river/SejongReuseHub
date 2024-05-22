export interface UserInterface {
  boardId: number;
  title: string;
  content: string;
  imgUrl: string;
  username: string;
  date: string;
}

export interface User {
  id: number;
  user: UserInterface;
  created: string;
  title: string;
  content: string;
}
