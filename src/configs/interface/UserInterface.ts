export interface UserInterface {
  boardId: number;
  title: string;
  content: string;
  imgUrl: string;
  username: string;
  date: string;
  latitude: number;
  longitude: number;
}

export interface User {
  id: number;
  user: UserInterface;
  created: string;
  title: string;
  content: string;
}
