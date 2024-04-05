/* eslint-disable global-require */
import CustomError from '../configs/CustomError';

import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import styles from './ErrorPage.module.scss';

interface ErrorPageProps {
  error?: CustomError;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  const message = error?.message || '404 Not Fount';
  const info =
    error?.response?.info || "The site you' looking for is not here.";

  return (
    <>
      <Header />
      <main>
        <div className={styles.wrapper}>
          <div className={styles.tmp}>
            <h1>{message}</h1>
            <p>{info}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
