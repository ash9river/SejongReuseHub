import { Dispatch, ReactElement, useCallback } from 'react';
import { markers } from 'services/mocks/marker';
import { useRecoilState } from 'recoil';
import { DataMarkerProps } from 'configs/interface/KakaoMapInterface';
import styles from './KakaoHeader.module.scss';
import SideBar from '../sidebar/SideBar';
import DeleteMarks from './DeleteMarks';
import { markerState } from '../recoil/MakerAtom';
import HeaderMenu from './HeaderMenu';
import HeaderProfile from './HeaderProfile';
// 카테고리 헤더

function KakaoHeader(): ReactElement {
  // type에 any를 써준 모습.. 리덕스로 수정예정
  const [MarkerState, setMarkerState] =
    useRecoilState<DataMarkerProps[]>(markerState);

  // console.log(MarkerState);
  return (
    <div className={styles.category}>
      <img
        src="../img/sejonglogo.png"
        alt="LogoImage"
        className={styles.ImgStyle}
      />
      {markers.map((mark, index: number) => {
        return (
          <div
            key={`${mark.Positions[index].lat},${mark.Positions[index].lng}`}
            className={styles['category-container']}
          >
            <button
              className={styles['category-button']}
              type="button"
              onClick={() => DeleteMarks(mark.name, setMarkerState)}
            >
              <img
                src={`/img/${mark.name}.png`}
                alt="CategoryImage"
                className={styles['img-container']}
                key={mark.name}
              />
            </button>
            {mark.name}
          </div>
        );
      })}
      <SideBar />
      <div className={styles['profile-menu']}>
        <HeaderProfile />
        <HeaderMenu />
      </div>
    </div>
  );
}

export default KakaoHeader;
