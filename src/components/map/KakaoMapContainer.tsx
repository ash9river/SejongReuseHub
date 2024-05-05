import MapTopMenuContainer from './sidebar/MapTopMenuContainer';
import KakaoMap from './KakaoMap';
import styles from './KakaoMapContainer.module.scss';
import KakaoHeader from './KakaoHeader';

function KakaMapContainer() {
  return (
    <div className={styles['map-wrap']}>
      <KakaoMap />
      <div className={styles['map-side']}>
        <KakaoHeader />
        <MapTopMenuContainer />
      </div>
    </div>
  );
}

export default KakaMapContainer;
