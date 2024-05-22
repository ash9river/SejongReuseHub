import { atom } from 'recoil';
import { CommentInterface } from 'configs/interface/CommentInterface';

export const commentState = atom<CommentInterface[]>({
  key: 'commentState',
  default: [],
});
