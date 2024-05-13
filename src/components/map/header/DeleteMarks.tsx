import { Dispatch } from 'react';
import { markers } from 'services/mocks/marker';
import { DataMarkerProps } from '../../../configs/interface/KakaoMapInterface';

function DeleteMarks(
  name: string,
  setMarkerState: Dispatch<DataMarkerProps[]>,
) {
  setMarkerState(markers);
  const newMarkers: DataMarkerProps[] = markers.filter(
    (category) => category.name === name,
  );
  setMarkerState(newMarkers);
}

export default DeleteMarks;
