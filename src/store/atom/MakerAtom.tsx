import { DataMarkerProps } from 'configs/interface/KakaoMapInterface';
import { atom } from 'recoil';

export const markerState = atom<DataMarkerProps[]>({
  key: 'markerState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
