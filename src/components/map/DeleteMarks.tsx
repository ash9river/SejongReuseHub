import { Dispatch } from 'react';
import { DataMarkerProps } from '../../configs/interface/KakaoMapInterface';

function DeleteMarks(
  name: string,
  markers: DataMarkerProps[],
  setSelectedCategory: Dispatch<DataMarkerProps[]>,
) {
  // 원본 배열 가져옴
  setSelectedCategory(markers);
  const newMarkers: DataMarkerProps[] = markers.filter(
    (category) => category.name === name, // 일치하는 배열만 추출
  );

  // 배열 재설정
  setSelectedCategory(newMarkers);
}

export default DeleteMarks;
