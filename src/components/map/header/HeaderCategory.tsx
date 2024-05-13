import { markers } from 'services/mocks/marker';
import { useSetRecoilState } from 'recoil';
import { categoryState } from 'store/atom/CategoryAtom';
import styles from './HeaderCategory.module.scss';

function HeaderCategory() {
  const setCategory = useSetRecoilState(categoryState);
  function handleClick(name: string) {
    setCategory(name);
  }

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
              onClick={() => handleClick(mark.name)}
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
