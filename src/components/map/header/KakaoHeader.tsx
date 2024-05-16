import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './KakaoHeader.module.scss';
import SideBar from '../sidebar/SideBar';
import HeaderCategory from './HeaderCategory';
import HeaderProfileMenu from './HeaderProfileMenu';

// 카테고리 헤더

function KakaoHeader(): ReactElement {
  // console.log(MarkerState);
  const navigator = useNavigate();
  function handleClick() {
    navigator('/');
  }

  return (
    <div className={styles.category}>
      <img
        src="../img/sejonglogo.png"
        alt="LogoImage"
        className={styles.ImgStyle}
        onClick={handleClick}
        aria-hidden
      />
      <HeaderCategory />
      <SideBar />
      <div className={styles['profile-menu']}>
        <HeaderProfileMenu isButton={false} name="profile" />
        <HeaderProfileMenu isButton name="menu" />
      </div>
    </div>
  );
}

export default KakaoHeader;
