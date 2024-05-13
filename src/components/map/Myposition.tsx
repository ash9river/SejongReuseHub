import { useMap } from 'react-kakao-maps-sdk';
import { useMemo } from 'react';
import { Position } from './header/Marker';
import styles from './Mypostion.module.scss';
// 내 위치로 가는 함수
function Myposition({ lat, lng }: Position) {
  const map = useMap();
  const bounds = useMemo(() => {
    const newBounds = new kakao.maps.LatLngBounds();

    newBounds.extend(new kakao.maps.LatLng(lat, lng));

    return newBounds;
  }, [lat, lng]);

  return (
    <button
      type="button"
      className={styles['my-position-container']}
      onClick={() => map.setBounds(bounds)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className={styles['my-position-content']}
      >
        <path d="M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
      </svg>
    </button>
  );
}

export default Myposition;
