export interface Position {
  lat: number;
  lng: number;
}

// 포지션 배열과 origin을 추가한 타입 지정
export interface MarkerProps {
  Positions: Position[];
  Origin: { x: number; y: number };
}

export interface DataMarkerProps extends MarkerProps {
  name: string;
}

export interface MarkerInterface {
  mapId: number;
  address: string;
  name: string;
  latitude: number;
  longitude: number;
  categoryId: number;
  categoryName: string;
}
