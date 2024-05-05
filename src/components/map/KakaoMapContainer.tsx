import MapTopMenuContainer from './sidebar/MapTopMenuContainer';
import KakaoHeader from './KakaoHeader';
import KakaoMap from './KakaoMap';
import styles from './KakaoMapContainer.module.scss';

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
