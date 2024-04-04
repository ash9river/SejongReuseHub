import { Map, MapMarker } from 'react-kakao-maps-sdk';

// postion 타입 지정
export interface Position {
  lat: number;
  lng: number;
}

// 포지션 배열과 origin을 추가한 타입 지정
export interface MarkerProps {
  Positions: Position[];
  Origin: { x: number; y: number };
}

const markerImageSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
const imageSize = { width: 22, height: 26 };
const spriteSize = { width: 36, height: 98 };
// 컴포넌트를 담은 함수
// 컴포넌트는 항상 JSX를 return하기 때문에 JSX.Element로 타입을 지정하면 된다.
function Marker({ Positions, Origin }: MarkerProps): JSX.Element {
  return (
    <>
      {Positions.map((position) => (
        <MapMarker
          key={`${position.lat},${position.lng}`}
          position={position}
          image={{
            src: markerImageSrc,
            size: imageSize,
            options: {
              spriteSize,
              spriteOrigin: Origin,
            },
          }}
        />
      ))}
    </>
  );
}

export default Marker;
