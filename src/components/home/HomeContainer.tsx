import Footer from 'components/UI/Footer';
import styles from './HomeContainer.module.scss';
import MainMapBack from './MainMapBack';
import MainLogo from './MainLogo';
import Content from './Content';
import DetailMore from './DetailMore';

function HomeContainer() {
  return (
    <div className={styles['scroll-container']}>
      <div className={styles['scroll-area']}>
        <MainMapBack />
        <MainLogo />
        <div className={styles['content-wrap']}>
          <Content />
          <DetailMore />
          <img
            className={styles['background-logo']}
            src="/img/sejonglogo.png"
            alt="logo"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeContainer;
