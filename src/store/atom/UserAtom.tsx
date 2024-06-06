import { UserInterface } from 'configs/interface/UserInterface';

import { atom } from 'recoil';

export const userState = atom<UserInterface>({
  key: 'userState',
  default: {
    boardId: 0,
    title: '',
    content: '',
    imgUrl: '',
    nickname: '',
    date: '',
    latitude: 0,
    longitude: 0,
    password: '',
  },
});
