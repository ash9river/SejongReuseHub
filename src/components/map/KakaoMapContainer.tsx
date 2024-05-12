import KakaoMap from './KakaoMap';
import KakaoHeader from './header/KakaoHeader';
import styles from './KakaoMapContainer.module.scss';

function KakaMapContainer() {
  return (
    <div className={styles['map-wrap']}>
      <KakaoMap />
      <div className={styles['map-side']}>
        <KakaoHeader />
      </div>
    </div>
  );
}

export default KakaMapContainer;
