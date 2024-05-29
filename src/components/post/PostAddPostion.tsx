import { Position } from 'configs/interface/KakaoMapInterface';
import getGeolocation from 'utils/getGeolocation';
import { useCallback, useState, useRef, useEffect } from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../hooks/useKakoaLoader';
import styles from './PostAddPostion.module.scss';

interface PositionProps {
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}

function PostAddPostion({ position, setPosition }: PositionProps) {
  useKakaoLoader();
  const { longitude, latitude } = getGeolocation();
  const mapRef = useCallback<React.RefCallback<kakao.maps.Map>>(
    (node: kakao.maps.Map) => {
      if (node) {
        node.setCenter(new kakao.maps.LatLng(longitude, latitude));
      }
    },
    [latitude, longitude],
  );

  return (
    <Map
      center={{
        lat: latitude,
        lng: longitude,
      }} // 지도의 중심 좌표
      className={styles['map-background']} // 지도 크기
      level={2} // 지도 확대 레벨
      ref={mapRef}
      onClick={(_, mouseEvent) => {
        const latlng = mouseEvent.latLng;
        setPosition({
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        });
      }}
    >
      <MapMarker position={position} draggable>
        <div style={{ padding: '5px', color: '#000' }}>좌표 선택</div>
      </MapMarker>
    </Map>
  );
}

export default PostAddPostion;
