import styles from './HeaderProfileMenu.module.scss';

export interface style_menu {
  isButton: string;
  name: string;
}

function HeaderProfileMenu({ isButton, name }: style_menu) {
  const ContainerComponent = isButton ? 'button' : 'div';

  return (
    <ContainerComponent className={styles[`${name}`]}>
      <img
        src={`./img/${name}.png`}
        alt={name}
        className={styles[`${name}-img`]}
      />
    </ContainerComponent>
  );
}

export default HeaderProfileMenu;
