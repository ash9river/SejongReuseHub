import styles from './HeaderProfile.module.scss';

function HeaderProfile() {
  return (
    <div className={styles['profile-container']}>
      <img
        src="./img/profile.png"
        alt="MenuImage"
        className={styles['img-container']}
      />
    </div>
  );
}

export default HeaderProfile;
