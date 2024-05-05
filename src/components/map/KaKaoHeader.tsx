import { Dispatch, ReactElement, useCallback } from 'react';
import { markers } from 'services/mocks/marker';
import styles from './KakaoHeader.module.scss';
import SideBar from './sidebar/SideBar';
// 카테고리 헤더

function KakaoHeader(): ReactElement {
  // type에 any를 써준 모습.. 리덕스로 수정예정

  return (
    <div className={styles.category}>
      <img src="../logo192.png" alt="LogoImage" className={styles.ImgStyle} />
      {markers.map((mark, index: number) => {
        return (
          <img
            src={`/img/${mark.name}.png`}
            alt="CategoryImage"
            className={styles['img-container']}
            key={mark.name}
          />
        );
      })}
      <SideBar />
    </div>
  );
}

export default KakaoHeader;
