import { useEffect } from 'react';
import KaKaoMap from './map';

const { kakao } = window;
// 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
export function createMarkerImage(src: any, size: any, options: any) {
  const markerImage = new kakao.maps.MarkerImage(src, size, options);
  return markerImage;
}

// 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
export function createMarker(position: any, image: any) {
  const marker = new kakao.maps.Marker({
    position,
    image,
  });

  return marker;
}
