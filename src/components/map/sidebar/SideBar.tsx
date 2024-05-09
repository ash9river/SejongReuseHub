import React, { useState, useCallback } from 'react';
import KakaoMapOpenSide from './KakaoMapOpenSide';

function SideBar() {
  const [isOpen, setMenu] = useState<boolean>(false); // 메뉴의 초기값을 false로 설정

  const toggleMenu = useCallback(() => {
    setMenu(!isOpen); // on,off 개념 boolean
  }, [isOpen]);
  return <KakaoMapOpenSide isOpen={isOpen} toggleMenu={toggleMenu} />;
}

export default SideBar;
