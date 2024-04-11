import { Dispatch } from 'react';
import styles from './KaKaoHeader.module.scss';
import DeleteMarks from './DeleteMarks';
import markers, { DataMarkerProps } from './data';

function KaKaoHeader({ setCategory }: any): JSX.Element {
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
