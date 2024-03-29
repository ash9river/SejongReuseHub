import useFetchMap from 'hooks/useFetchMap';
import getGeolocation from 'utils/getGeolocation';

import { useEffect, useRef } from 'react';
import styles from './MapContainer.module.scss';

function MapContainer() {
  const { kakao } = window;
  const { longitude, latitude } = getGeolocation();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    kakao.maps.load(function () {
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      kakao.maps.load(function () {
        const map = new kakao.maps.Map(containerRef.current, options);
      });
    });
  }, [latitude, longitude]);
  return <div ref={containerRef} className={styles['map-container']} />;
}

export default MapContainer;
