import { atom } from 'recoil';
import { markers } from 'services/mocks/marker';

export const markerState = atom({
  key: 'markerState', // unique ID (with respect to other atoms/selectors)
  default: markers, // default value (aka initial value)
});
