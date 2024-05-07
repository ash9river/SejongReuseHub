import getGeolocation from 'utils/getGeolocation';
import { useRef } from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import UseKakaoLoader from '../../hooks/useKakoaLoader';
import styles from './MainMapBack.module.scss';

function MainMapBack() {
  UseKakaoLoader();
  const { longitude, latitude } = getGeolocation();
  const mapRef = useRef<kakao.maps.Map>(null);
  return (
    <Map
      center={{
        lat: latitude,
        lng: longitude,
      }} // 지도의 중심 좌표
      className={styles['map-background']} // 지도 크기
      level={4} // 지도 확대 레벨
      // mapTypeId={mapType === 'roadmap' ? 'ROADMAP' : 'HYBRID'}
      ref={mapRef}
    />
  );
}

export default MainMapBack;
