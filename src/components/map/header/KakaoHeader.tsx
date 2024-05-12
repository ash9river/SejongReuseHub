import { Dispatch, ReactElement, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { DataMarkerProps } from 'configs/interface/KakaoMapInterface';
import styles from './KakaoHeader.module.scss';
import SideBar from '../sidebar/SideBar';
import { markerState } from '../recoil/MakerAtom';
import HeaderMenu from './HeaderMenu';
import HeaderProfile from './HeaderProfile';
import HeaderCategory from './HeaderCategory';
// 카테고리 헤더

function KakaoHeader(): ReactElement {
  // console.log(MarkerState);
  return (
    <div className={styles.category}>
      <img
        src="../img/sejonglogo.png"
        alt="LogoImage"
        className={styles.ImgStyle}
      />
      <HeaderCategory />
      <SideBar />
      <div className={styles['profile-menu']}>
        <HeaderProfile />
        <HeaderMenu />
      </div>
    </div>
  );
}

export default KakaoHeader;
