import React, { useEffect, useRef, useState } from 'react';
import getGeolocation from 'utils/getGeolocation';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Marker from './Marker';
import markers from './data';

const { kakao } = window;

const locations = [
  {
    title: '카카오',
    latlng: { lat: 37.486705, lng: 126.970677 },
  },
  {
    title: '생태연못',
    latlng: { lat: 37.486704, lng: 126.970673 },
  },
  {
    title: '텃밭',
    latlng: { lat: 37.486701, lng: 126.970677 },
  },
  {
    title: '근린공원',
    latlng: { lat: 37.486702, lng: 126.970677 },
  },
];

export default function KaKaoMap() {
  const location = getGeolocation();
  const [selectedCategory, setSelectedCategory] = useState('coffee');

  return (
    <div>
      <Map
        center={{
          lat: location.latitude,
          lng: location.longitude,
        }} // 지도의 중심 좌표
        style={{ width: '100vw', height: '100vh' }} // 지도 크기
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

        <Marker
          Positions={markers[`${selectedCategory}Positions`]}
          Origin={markers[`${selectedCategory}Origin`]}
        />
      </Map>
      <div className="category">
        <ul style={{ gap: '10px', display: 'flex', flexDirection: 'row' }}>
          <button type="button" onClick={() => setSelectedCategory('coffee')}>
            커피숍
          </button>

          <button type="button" onClick={() => setSelectedCategory('store')}>
            편의점
          </button>

          <button type="button" onClick={() => setSelectedCategory('carpark')}>
            주차장
          </button>
        </ul>
      </div>
    </div>
  );
}
