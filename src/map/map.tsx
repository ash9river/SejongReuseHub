import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from 'utils/useGeolocation';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { createMarker, createMarkerImage } from './marker';

const { kakao } = window;

const locations = [
  {
    title: '카카오',
    latlng: { lat: 37.486705, lng: 126.970677 },
  },
  {
    title: '생태연못',
    latlng: { lat: 37.486705, lng: 126.970674 },
  },
  {
    title: '텃밭',
    latlng: { lat: 37.486705, lng: 126.970671 },
  },
  {
    title: '근린공원',
    latlng: { lat: 37.486705, lng: 126.970673 },
  },
];

export default function KaKaoMap() {
  const location = useGeolocation();
  return (
    <Map
      center={{
        lat: location.coordinates.latitude,
        lng: location.coordinates.longitude,
      }} // 지도의 중심 좌표
      style={{ width: '800px', height: '600px' }} // 지도 크기
      level={3} // 지도 확대 레벨
    >
      {locations.map((loc, idx) => (
        <MapMarker
          key={`${loc.title}-${loc.latlng}`}
          position={loc.latlng}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            size: { width: 24, height: 35 },
          }}
          title={loc.title}
        />
      ))}
    </Map>
  );
}
