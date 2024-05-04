import MapTopMenuContainer from './sidebar/MapTopMenuContainer';
import KaKaoHeader from './KakaoHeader';
import KaKaoMap from './KakaoMap';
import styles from './KakaoMapContainer.module.scss';

function KakaMapContainer() {
  return (
    <div className={styles['map-wrap']}>
      <KaKaoMap />
      <div className={styles['map-side']}>
        <KaKaoHeader />
        <MapTopMenuContainer />
      </div>
    </div>
  );
}

export default KakaMapContainer;
