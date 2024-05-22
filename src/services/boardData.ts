// 임시로 만든 데이터입니다
import { UserInterface } from 'configs/interface/UserInterface';

interface Item {
  id: number;
  user: UserInterface;
  created: string;
  title: string;
  content: string;
}

export const dummyData: Item[] = [
  {
    id: 0,
    user: {
      boardId: 123,
      title: 'Sample Title',
      content: 'This is an example content for the User object.',
      imgUrl: '../public/img/페트병.png',
      username: 'exampleUser',
      date: '2024-05-22',
    },
    created: '2024-05-12',
    title: '나눔',
    content: '재활용해요',
  },
  {
    id: 0,
    user: {
      boardId: 123,
      title: 'Sample Title',
      content: 'This is an example content for the User object.',
      imgUrl: '../img/페트병.png',
      username: 'exampleUser',
      date: '2024-05-22',
    },
    created: '2024-05-12',
    title: '나눔',
    content: '재활용해요',
  },
  {
    id: 0,
    user: {
      boardId: 123,
      title: 'Sample Title',
      content: 'This is an example content for the User object.',
      imgUrl: '../img/페트병.png',
      username: 'exampleUser',
      date: '2024-05-22',
    },
    created: '2024-05-12',
    title: '나눔',
    content: '재활용해요',
  },
];
