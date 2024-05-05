import React, { useState, useRef, useCallback } from 'react';
import styles from './KakaoMapOpenSide.module.scss';

interface KaKaoMapOpenSideProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

// 함수형 컴포넌트의 프로퍼티를 받을 때 객체 형태로 받는 것은 React의 동작 방식과 관련이 있습니다.
// React에서는 함수형 컴포넌트의 프로퍼티들이 단일 객체로 전달되기 때문에, 이를 명확하게 타입으로 지정하기 위해서는 객체 형태로 받아와야 합니다.

function KaKaoMapOpenSide({ isOpen, toggleMenu }: KaKaoMapOpenSideProps) {
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
