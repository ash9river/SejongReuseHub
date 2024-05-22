import { atom } from 'recoil';
import { Commentinterface } from 'configs/interface/CommentInterface';

export const commentState = atom<Commentinterface[]>({
  key: 'commentState',
  default: [],
});
