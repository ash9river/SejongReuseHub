import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import styles from './HeaderWrite.module.scss';

function HeaderWrite() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('../postView/add');
  }, []);
  const handleClick2 = useCallback(() => {
    navigate('../postView');
  }, []);
  return (
    <div className={styles.asd}>
      <button
        type="button"
        className={`${styles.btn} ${styles['btn-primary']}`}
        onClick={handleClick2}
      >
        <img
          src="../img/게시글.png"
          alt="CategoryImage"
          className={styles['img-container']}
        />
        게시글
      </button>
      <button
        type="button"
        className={`${styles.btn} ${styles['btn-primary']}`}
        onClick={handleClick}
      >
        <img
          src="../img/글쓰기.png"
          alt="CategoryImage"
          className={styles['img-container']}
        />
        글쓰기
      </button>
    </div>
  );
}

export default HeaderWrite;
