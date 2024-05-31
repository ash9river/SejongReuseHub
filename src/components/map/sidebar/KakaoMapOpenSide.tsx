import { useRecoilState } from 'recoil';
import { isSideBarOpenState } from 'store/atom/SideBarAtom';
import { useEffect } from 'react';
import styles from './KakaoMapOpenSide.module.scss';
import SidePanel from './SidePanel';

function KakaoMapOpenSide() {
  const [isSideBarOpen, setIsSideBarOpen] = useRecoilState(isSideBarOpenState);

  function toggleMenu() {
    if (isSideBarOpen % 2 === 0) {
      setIsSideBarOpen((prevState) => prevState + 1);
    } else {
      setIsSideBarOpen((prevState) => prevState - 1);
    }
  }

  return (
    <div className={styles['sidebar-container']}>
      <button
        type="button"
        className={styles[`sidebar-open-${isSideBarOpen}`]}
        onClick={toggleMenu}
      >
        <p className={styles['inner-text']}>&#8227;</p>
      </button>
      <div className={styles[`sidebar-panel-${isSideBarOpen}`]}>
        <SidePanel />
      </div>
    </div>
  );
}

export default KakaoMapOpenSide;
