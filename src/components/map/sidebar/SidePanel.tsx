import PostList from './postList/PostList';
import styles from './SidePanel.module.scss';

function SidePanel() {
  return (
    <div className={styles['panel-container']}>
      <PostList />
    </div>
  );
}

export default SidePanel;
