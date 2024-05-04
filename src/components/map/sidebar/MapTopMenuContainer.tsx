import styles from './MapTopMenuConatainer.module.scss';

const tmpIcon = [
  { id: 1, title: '폐의약품' },
  { id: 2, title: '폐건전지' },
];

function MapTopMenuContainer() {
  function handleClick(title: string) {
    // set category
  }

  return (
    <div className={styles['top-menu-container']}>
      <ul>
        {tmpIcon.map((item: any) => (
          <li key={item.id}>
            <button
              type="button"
              className={styles['top-menu-button']}
              onClick={() => handleClick(item.title)}
            >
              <p>{item.title}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapTopMenuContainer;
