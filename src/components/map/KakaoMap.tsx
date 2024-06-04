import { useEffect, useRef } from 'react';
import getGeolocation from 'utils/getGeolocation';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import {
  DataMarkerProps,
  MarkerInterface,
  BoardMarkerInterface,
  MarkerProps,
} from 'configs/interface/KakaoMapInterface';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { categoryState } from 'store/atom/CategoryAtom';
import { getData } from 'services/getData';
import { AxiosError } from 'axios';
import Marker from './header/Marker';
import useKakaoLoader from '../../hooks/useKakoaLoader';
import Myposition from './Myposition';
import styles from './KakaoMap.module.scss';

const { kakao } = window;

function KakaoMap() {
  useKakaoLoader();
  const { longitude, latitude } = getGeolocation();
  const mapRef = useRef<kakao.maps.Map>(null);
  // const [mapType, setMapType] = useState<'roadmap' | 'skyview'>('roadmap');
  const [category, setCategory] = useRecoilState(categoryState);

  const { data, isLoading, isError } = useQuery<MarkerInterface[], AxiosError>({
    queryKey: ['marker'],
    queryFn: ({ signal }) => getData('api/maps', signal),
    staleTime: 5000,
  });
  const {
    data: boardData,
    isLoading: isBoardDataLoading,
    isError: isBoardDataError,
  } = useQuery<BoardMarkerInterface[], AxiosError>({
    queryKey: ['boardMarker'], // 고유한 쿼리 키를 지정
    queryFn: ({ signal }) => getData('api/boards/map', signal), // 새로운 API 엔드포인트를 지정
    staleTime: 5000,
  });

  useEffect(() => {
    console.log(boardData);
  }, [boardData]);

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
      {category === '게시글' && boardData !== undefined
        ? boardData.map((mark: BoardMarkerInterface) => {
            const position = {
              lat: mark.latitude,
              lng: mark.longitude,
            };
            return (
              <Marker
                key={`${mark.id}`}
                position={position}
                id={mark.id}
                name="페트병"
              />
            );
          })
        : data !== undefined &&
          data
            .filter((mark: MarkerInterface) => mark.categoryName === category)
            .map((mark: MarkerInterface, index: number) => {
              const position = {
                lat: mark.latitude,
                lng: mark.longitude,
              };
              return (
                <Marker
                  key={`${mark.mapId}`}
                  id={mark.mapId}
                  position={position}
                  name={mark.categoryName}
                />
              );
            })}

      {/* 내 위치가는 버튼 */}
      <Myposition lat={latitude} lng={longitude} />
    </Map>
  );
}
export default KakaoMap;
