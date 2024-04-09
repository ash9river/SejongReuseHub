import Footer from 'components/UI/Footer';
import styles from './HomeContainer.module.scss';

function HomeContainer() {
  return (
    <div className={styles['scroll-container']}>
      <div className={styles['scroll-area']} />
      <div className={styles['scroll-area']} />
      <div className={styles['scroll-area']}>
        <div className={styles['rest-area']} />
        <Footer />
      </div>
    </div>
  );
}

export default HomeContainer;
