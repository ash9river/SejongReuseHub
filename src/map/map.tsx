import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from 'utils/useGeolocation';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import markers from './data';
import Marker from './map_marker';

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
  const location = useGeolocation();
  const [selectedCategory, setSelectedCategory] = useState('coffee');

  // useEffect(() => {
  //   const coffeeMenu = document.getElementById('coffeeMenu');
  //   const storeMenu = document.getElementById('storeMenu');
  //   const carparkMenu = document.getElementById('carparkMenu');

  //   if (selectedCategory === 'coffee') {
  //     // 커피숍 카테고리를 선택된 스타일로 변경하고
  //     coffeeMenu.className = 'menu_selected';

  //     // 편의점과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
  //     storeMenu.className = '';
  //     carparkMenu.className = '';
  //   } else if (selectedCategory === 'store') {
  //     // 편의점 카테고리가 클릭됐을 때

  //     // 편의점 카테고리를 선택된 스타일로 변경하고
  //     coffeeMenu.className = '';
  //     storeMenu.className = 'menu_selected';
  //     carparkMenu.className = '';
  //   } else if (selectedCategory === 'carpark') {
  //     // 주차장 카테고리가 클릭됐을 때

  //     // 주차장 카테고리를 선택된 스타일로 변경하고
  //     coffeeMenu.className = '';
  //     storeMenu.className = '';
  //     carparkMenu.className = 'menu_selected';
  //   }
  // }, [selectedCategory]);
  return (
    <div>
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
        {selectedCategory === 'coffee' && (
          <Marker
            Positions={markers.coffeePositions}
            Origin={markers.coffeeOrigin}
          />
        )}
        {selectedCategory === 'store' && (
          <Marker
            Positions={markers.storePositions}
            Origin={markers.storeOrigin}
          />
        )}
        {selectedCategory === 'carpark' && (
          <Marker
            Positions={markers.carparkPositions}
            Origin={markers.carparkOrigin}
          />
        )}
      </Map>
      <div className="category">
        <ul>
          <li>
            <button type="button" onClick={() => setSelectedCategory('coffee')}>
              커피숍
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setSelectedCategory('store')}>
              편의점
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setSelectedCategory('carpark')}
            >
              주차장
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
