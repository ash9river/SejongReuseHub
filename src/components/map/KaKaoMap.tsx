import { useEffect, useRef, useState } from 'react';
import getGeolocation from 'utils/getGeolocation';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import { DataMarkerProps } from 'configs/interface/KakaoMapInterface';
import { markers } from 'services/mocks/marker';
import KaKaoMapOpenSide from './KaKaoMapOpenSide';
import Marker, { MarkerProps, Position } from './Marker';
import styles from './KaKaoMap.module.scss';
import UseKakaoLoader from '../../hooks/useKakoaLoader';
import KaKaoHeader from './KaKaoHeader';
import Myposition from './Myposition';
import MapTopMenuContainer from './sidebar/MapTopMenuContainer';

const { kakao } = window;

function KaKaoMap() {
  UseKakaoLoader();
  const { longitude, latitude } = getGeolocation();
  const mapRef = useRef<kakao.maps.Map>(null);
  // const [mapType, setMapType] = useState<'roadmap' | 'skyview'>('roadmap');

  // 초기 배열 기본값
  const FirstMarker = markers?.filter((category) => category.name === 'coffee');

  return (
    <div className={styles['map-wrap']}>
      <Map
        center={{
          lat: latitude,
          lng: longitude,
        }} // 지도의 중심 좌표
        className={styles['map-container']} // 지도 크기
        level={3} // 지도 확대 레벨
        // mapTypeId={mapType === 'roadmap' ? 'ROADMAP' : 'HYBRID'}
        ref={mapRef}
      >
        <MapTypeControl position="RIGHT" />
        {/* <KaKaoMapControl maptype={mapType} setMapType={setMapType} /> */}
        <ZoomControl position="BOTTOMRIGHT" />
        <MapMarker position={{ lat: latitude, lng: longitude }} />
        {/* 맵 중첩이가능함 */}
        {markers &&
          markers.map((mark: DataMarkerProps, index: number) => {
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
      <div className={styles['map-side']}>
        <KaKaoHeader />
        <KaKaoMapOpenSide />
        <MapTopMenuContainer />
      </div>
    </div>
  );
}
export default KaKaoMap;
