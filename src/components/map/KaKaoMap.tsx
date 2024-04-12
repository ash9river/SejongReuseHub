import { useEffect, useRef, useState } from 'react';
import getGeolocation from 'utils/getGeolocation';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import KaKaoMapControl from './KaKaoMapControl';

import Marker, { MarkerProps, Position } from './Marker';
import markers, { DataMarkerProps } from './data';
import styles from './KaKaoMap.module.scss';
import UseKakaoLoader from './UseKakoaLoader';
import DeleteMarks from './DeleteMarks';
import KaKaoHeader from './KaKaoHeader';
import Myposition from './Myposition';

const { kakao } = window;

function KaKaoMap() {
  UseKakaoLoader();
  const { longitude, latitude } = getGeolocation();

  const mapRef = useRef<kakao.maps.Map>(null);
  // const [mapType, setMapType] = useState<'roadmap' | 'skyview'>('roadmap');

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
        // mapTypeId={mapType === 'roadmap' ? 'ROADMAP' : 'HYBRID'}
        ref={mapRef}
      >
        <MapTypeControl position="TOPLEFT" />
        {/* <KaKaoMapControl maptype={mapType} setMapType={setMapType} /> */}
        <ZoomControl position="RIGHT" />
        <MapMarker position={{ lat: latitude, lng: longitude }} />
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
        {/* 내 위치가는 버튼 */}
        <Myposition lat={latitude} lng={longitude} />
      </Map>

      <KaKaoHeader setCategory={setSelectedCategory} />
    </div>
  );
}
export default KaKaoMap;
