import React, { useState, useRef, useCallback } from 'react';
import styles from './KaKaoMapOpenSide.module.scss';

function KaKaoMapOpenSide() {
  const [isOpen, setMenu] = useState<boolean>(false); // 메뉴의 초기값을 false로 설정

  const toggleMenu = useCallback(() => {
    setMenu(!isOpen); // on,off 개념 boolean
  }, [isOpen]);

  return (
    <div className="header-button">
      <button type="button" className={styles.button} onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className={styles.buttonStyle}
        >
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </button>

      <ul className={isOpen ? 'show-menu' : 'hide-menu'}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  );
}

export default KaKaoMapOpenSide;
