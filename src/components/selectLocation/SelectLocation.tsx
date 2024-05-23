import React, { useEffect, useRef, useState } from 'react';
import getGeolocation from 'utils/getGeolocation';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import useKakaoLoader from '../../hooks/useKakoaLoader';
import Myposition from '../map/Myposition';
import styles from './SelectLocation.module.scss';

interface SelectLocationProps {
  changeLocation: (location: { lat: number; lng: number }) => void;
}
function SelectLocation({ changeLocation }: SelectLocationProps): JSX.Element {
  useKakaoLoader();
  const { longitude, latitude } = getGeolocation();

  const [data, setData] = useState<{
    level: number;
    position: {
      lat: number;
      lng: number;
    };
  }>();

  // useEffect(() => {
  //   if (data) {
  //     setLocation({
  //       lat: data.position.lat,
  //       lng: data.position.lng,
  //     });
  //   }
  // }, [data, setLocation]);

  return (
    <div className={styles.mapWrap}>
      <Map
        center={{
          lat: latitude,
          lng: longitude,
        }} // 지도의 중심 좌표
        className={styles['map-container']}
        level={3}
        onCenterChanged={(map) => {
          const level1 = map.getLevel();
          const latlng = map.getCenter();

          setData({
            level: level1,
            position: {
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            },
          });
          changeLocation({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          });
        }}
      >
        {!data && <MapMarker position={{ lat: latitude, lng: longitude }} />}
        {data && data.position && (
          <MapMarker
            position={{ lat: data.position.lat, lng: data.position.lng }}
          />
        )}

        {/* <Myposition lat={latitude} lng={longitude} /> */}
      </Map>
    </div>
  );
}

export default SelectLocation;
