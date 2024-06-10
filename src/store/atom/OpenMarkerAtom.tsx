import { atom } from 'recoil';

export const OpenMarkerState = atom<number | null>({
  key: 'OpenMarkerState',
  default: null,
});
