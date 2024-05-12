import { useCallback, useEffect, useRef, useState } from 'react';
import getGeolocation from 'utils/getGeolocation';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import { DataMarkerProps } from 'configs/interface/KakaoMapInterface';
import { useRecoilState, useRecoilValue } from 'recoil';
import { markers } from 'services/mocks/marker';
import Marker, { MarkerProps, Position } from './header/Marker';
import useKakaoLoader from '../../hooks/useKakoaLoader';
import Myposition from './Myposition';
import styles from './KakaoMap.module.scss';
import { markerState } from './recoil/MakerAtom';
import DeleteMarks from './header/DeleteMarks';

const { kakao } = window;

function KakaoMap() {
  useKakaoLoader();
  const { longitude, latitude } = getGeolocation();
  const mapRef = useRef<kakao.maps.Map>(null);
  // const [mapType, setMapType] = useState<'roadmap' | 'skyview'>('roadmap');

  // 초기 배열 기본값
  const [MarkerState, setMarkerState] =
    useRecoilState<DataMarkerProps[]>(markerState);

  useEffect(() => {
    DeleteMarks('페트병', setMarkerState); // 처음 배열값으로 설정
  }, []);

  return (
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
      {MarkerState.map((mark: DataMarkerProps, index: number) => {
        return (
          <Marker
            key={`${mark.Positions[index].lat},${mark.Positions[index].lng}`}
            Positions={mark.Positions}
            Origin={mark.Origin}
            name={mark.name}
          />
        );
      })}
      {/* 내 위치가는 버튼 */}
      <Myposition lat={latitude} lng={longitude} />
    </Map>
  );
}
export default KakaoMap;
