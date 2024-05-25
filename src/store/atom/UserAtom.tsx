import { UserInterface } from 'configs/interface/UserInterface';

import { atom } from 'recoil';

export const userState = atom<UserInterface>({
  key: 'userState',
  default: {
    boardId: 0,
    title: '',
    content: '',
    imgUrl: '',
    username: '',
    date: '',
    latitude: 0,
    longitude: 0,
  },
});
