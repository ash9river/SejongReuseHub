import Footer from 'components/UI/Footer';
import styles from './HomeContainer.module.scss';
import MainMapBackGround from './MainMapBackground';
import MainLogo from './MainLogo';
import Content from './Content';

function HomeContainer() {
  return (
    <div className={styles['home-container']}>
      <div className={styles['main-area']}>
        <img
          className={styles['background-logo']}
          src="/img/sejongwhite.png"
          alt="logo"
        />
        <MainMapBackGround />
        <div className={styles['transparent-area']} />
        <div className={styles['content-wrap']}>
          <MainLogo />
          <Content />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeContainer;
