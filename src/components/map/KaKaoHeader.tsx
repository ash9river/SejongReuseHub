import { Dispatch } from 'react';
import styles from './KaKaoHeader.module.scss';
import DeleteMarks from './DeleteMarks';
import markers, { DataMarkerProps } from './data';
// 카테고리 헤더
function KaKaoHeader({ setCategory }: any): JSX.Element {
  // type에 any를 써준 모습.. 리덕스로 수정예정
  return (
    <div className={styles.category}>
      <img src="../logo192.png" alt="LogoImage" className={styles.ImgStyle} />
      {markers.map((mark, index: number) => {
        return (
          <button
            type="button"
            className={styles.category_button}
            key={`${mark.Positions[index].lat},${mark.Positions[index].lng}`}
            onClick={() => DeleteMarks(mark.name, markers, setCategory)}
          >
            <img
              src={`/img/${mark.name}.png`}
              alt="CategoryImage"
              className={styles.ImgStyle}
            />
            {/* {mark.name} */}
          </button>
        );
      })}
    </div>
  );
}

export default KaKaoHeader;
