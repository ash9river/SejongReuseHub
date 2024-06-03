import { useSetRecoilState } from 'recoil';
import { categoryState } from 'store/atom/CategoryAtom';
import styles from './HeaderCategory.module.scss';

const markerCategory = [
  {
    key: 1,
    name: '폐건전지,폐형광등',
  },
  {
    key: 2,
    name: '재활용쓰레기',
  },
  {
    key: 3,
    name: '의류수거함',
  },
  {
    key: 4,
    name: '페트병',
  },
  {
    key: 5,
    name: '아름다운가게',
  },
  {
    key: 6,
    name: '게시글',
  },
];

function HeaderCategory() {
  const setCategory = useSetRecoilState(categoryState);
  function handleClick(name: string) {
    setCategory(name);
  }

  return (
    <div className={styles['header-category-all']}>
      {markerCategory.map((mark) => {
        return (
          <div
            key={`categoryKey${mark.key}`}
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
            <p className={styles['category-text']}>{mark.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default HeaderCategory;
