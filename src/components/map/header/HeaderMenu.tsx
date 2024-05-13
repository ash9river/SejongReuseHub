import styles from './HeaderMenu.module.scss';

function HeaderMenu() {
  return (
    <button className={styles['menu-button']} type="button">
      <img
        src="./img/menu.png"
        alt="MenuImage"
        className={styles['img-container']}
      />
    </button>
  );
}

export default HeaderMenu;
