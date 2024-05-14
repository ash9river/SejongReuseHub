import Footer from 'components/UI/Footer';
import styles from './HomeContainer.module.scss';
import MainMapBackGround from './MainMapBackground';
import MainLogo from './MainLogo';
import Content from './Content';
import DetailMore from './DetailMore';

function HomeContainer() {
  return (
    <div className={styles['home-container']}>
      <div className={styles['main-area']}>
        <MainMapBackGround />
        <MainLogo />
        <div className={styles['content-wrap']}>
          <Content />
          <div className={styles['content-wrap-bottom']}>
            <DetailMore />
            <img
              className={styles['background-logo']}
              src="/img/sejongwhite.png"
              alt="logo"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeContainer;
