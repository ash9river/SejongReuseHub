import { atom } from 'recoil';
import { FormType } from 'configs/interface/FormInterface';

export const formState = atom<FormType>({
  key: 'formState',
  default: {
    title: '',
    content: '',
    author: '',
    password: '',
    category: '',
  },
});
