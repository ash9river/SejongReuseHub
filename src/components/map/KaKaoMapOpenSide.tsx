import React, { useState, useRef, useCallback } from 'react';
import styles from './KaKaoMapOpenSide.module.scss';

function KaKaoMapOpenSide() {
  const [isOpen, setMenu] = useState<boolean>(false); // 메뉴의 초기값을 false로 설정

  const toggleMenu = useCallback(() => {
    setMenu(!isOpen); // on,off 개념 boolean
  }, [isOpen]);

  return (
    <div className={styles['header-button']}>
      <button
        type="button"
        className={isOpen ? styles['hide-button'] : styles['show-button']}
        onClick={toggleMenu}
      >
        <img
          className={styles['img-container']}
          src="/img/left.png"
          alt="show-button"
        />
      </button>

      <div className={isOpen ? styles['show-menu'] : styles['hide-menu']} />
    </div>
  );
}

export default KaKaoMapOpenSide;
