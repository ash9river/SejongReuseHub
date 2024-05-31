import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import styles from './HeaderWrite.module.scss';

function HeaderWrite() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('../postView/add');
  }, []);
  return (
    <div className={styles.asd}>
      <button
        type="button"
        className={`${styles.btn} ${styles['btn-primary']}`}
        onClick={handleClick}
      >
        글쓰기
      </button>
    </div>
  );
}

export default HeaderWrite;
