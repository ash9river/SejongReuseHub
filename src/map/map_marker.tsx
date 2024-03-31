import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface Position {
  lat: number;
  lng: number;
}

interface MarkerProps {
  Positions: Position[];
  Origin: { x: number; y: number };
}

const markerImageSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
const imageSize = { width: 22, height: 26 };
const spriteSize = { width: 36, height: 98 };
export default function Marker({ Positions, Origin }: MarkerProps) {
  return Positions.map((position) => (
    <MapMarker
      key={`carpark-${position.lat},${position.lng}`}
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
  ));
}
