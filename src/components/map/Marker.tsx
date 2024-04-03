import React, { ReactNode } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export interface Position {
  lat: number;
  lng: number;
}

export interface MarkerProps {
  Positions: Position[];
  Origin: { x: number; y: number };
}

const markerImageSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
const imageSize = { width: 22, height: 26 };
const spriteSize = { width: 36, height: 98 };
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
