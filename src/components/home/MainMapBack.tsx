import getGeolocation from 'utils/getGeolocation';
import { useCallback, useEffect, useRef } from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import { motion } from 'framer-motion';
import useKakaoLoader from '../../hooks/useKakoaLoader';
import styles from './MainMapBack.module.scss';

function MainMapBack() {
  useKakaoLoader();
  const { longitude, latitude } = getGeolocation();
  const mapRef = useCallback<React.RefCallback<kakao.maps.Map>>(
    (node: kakao.maps.Map) => {
      if (node) {
        node.setCenter(new kakao.maps.LatLng(longitude, latitude));
      }
    },
    [longitude, latitude],
  );

  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Map
        center={{
          lat: latitude,
          lng: longitude,
        }} // 지도의 중심 좌표
        className={styles['map-background']} // 지도 크기
        level={1} // 지도 확대 레벨
        ref={mapRef}
      >
        <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
          position={{
            // 인포윈도우가 표시될 위치입니다
            lat: latitude,
            lng: longitude,
          }}
        >
          <div style={{ padding: '5px', color: '#000' }}>교환해요</div>
        </MapMarker>
      </Map>
    </motion.div>
  );
}

export default MainMapBack;
