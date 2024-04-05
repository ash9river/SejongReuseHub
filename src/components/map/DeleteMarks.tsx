import { DataMarkerProps } from './data';

function DeleteMarks(
  name: string,
  markers: DataMarkerProps[],
  setSelectedCategory: (markers: DataMarkerProps[]) => void,
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
