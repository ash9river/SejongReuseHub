import { MapMarker } from 'react-kakao-maps-sdk';

// postion 타입 지정
export interface Position {
  lat: number;
  lng: number;
}

// 포지션 배열과 origin을 추가한 타입 지정
export interface MarkerProps {
  name: string;
  position: Position;
}

const imageSize = { width: 22, height: 30 };

// 컴포넌트를 담은 함수
// 컴포넌트는 항상 JSX를 return하기 때문에 JSX.Element로 타입을 지정하면 된다.
function Marker({ name, position }: MarkerProps): JSX.Element {
  return (
    <MapMarker
      key={`${position.lat},${position.lng}`}
      position={position}
      image={{
        src: `/img/${name}pin.png`,
        size: imageSize,
        options: {
          // offset: {
          //   x: 27,
          //   y: 69,
          // },
        },
      }}
    />
  );
}

export default Marker;
