import { markers } from 'services/mocks/marker';
import { useRecoilState } from 'recoil';
import { DataMarkerProps } from 'configs/interface/KakaoMapInterface';
import DeleteMarks from './DeleteMarks';
import styles from './HeaderCategory.module.scss';
import { markerState } from '../recoil/MakerAtom';

function HeaderCategory() {
  const [MarkerState, setMarkerState] =
    useRecoilState<DataMarkerProps[]>(markerState);
  // DeleteMarks('폐건전지', setMarkerState);
  return (
    <div>
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
    </div>
  );
}

export default HeaderCategory;
