import { useEffect, useRef, useState } from 'react';
import getGeolocation from 'utils/getGeolocation';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';

import Marker, { MarkerProps } from './Marker';
import markers, { DataMarkerProps } from './data';
import styles from './KaKaoMap.module.scss';
import UseKakaoLoader from './UseKakoaLoader';
import DeleteMarks from './DeleteMarks';

const { kakao } = window;

export default function KaKaoMap() {
  UseKakaoLoader();
  const { longitude, latitude } = getGeolocation();
  const mapRef = useRef<kakao.maps.Map>(null);
  // 초기 배열 기본값
  const FirstMarker: DataMarkerProps[] = markers.filter(
    (category) => category.name === 'coffee',
  );
  const [selectedCategory, setSelectedCategory] =
    useState<DataMarkerProps[]>(FirstMarker);

  return (
    <div className={styles.mapWrap}>
      <Map
        center={{
          lat: latitude,
          lng: longitude,
        }} // 지도의 중심 좌표
        className={styles.MapStyle} // 지도 크기
        level={3} // 지도 확대 레벨
        ref={mapRef}
      >
        <MapTypeControl position="TOPRIGHT" />
        <ZoomControl position="RIGHT" />
        <MapMarker position={{ lat: latitude, lng: longitude }}>
          {/* <div style={{ padding: '5px', color: '#000' }} /> */}
        </MapMarker>
        {/* 맵 중첩이가능함 */}
        {selectedCategory.map((mark: DataMarkerProps, index: number) => {
          return (
            <Marker
              key={`${mark.Positions[index].lat},${mark.Positions[index].lng}`}
              Positions={mark.Positions}
              Origin={mark.Origin}
            />
          );
        })}
      </Map>

      <div className={styles.category}>
        {markers.map((mark, index: number) => {
          return (
            <button
              type="button"
              className={styles.category_button}
              key={`${mark.Positions[index].lat},${mark.Positions[index].lng}`}
              onClick={() =>
                DeleteMarks(mark.name, markers, setSelectedCategory)
              }
            >
              <img
                src={`/img/${mark.name}.png`}
                alt="CategoryImage"
                className={styles.ImgStyle}
              />
              {/* {mark.name} */}
            </button>
          );
        })}
      </div>
    </div>
  );
}
