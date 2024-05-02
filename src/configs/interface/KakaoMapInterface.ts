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
