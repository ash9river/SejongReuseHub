import { useState } from 'react';
import styles from './DetailMore.module.scss';

function DetailMore() {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setVisible(!visible);
        }}
        className={styles['button-style']}
      >
        구성원 자세히
      </button>
    </div>
  );
}

export default DetailMore;
