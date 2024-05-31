import { useQuery } from '@tanstack/react-query';
import { getData } from 'services/getData';
import { useEffect } from 'react';
import PostList from './postList/PostList';
import styles from './SidePanel.module.scss';

interface MapPostListInterface {
  id: number;
  latitude: number;
  longitude: number;
}

function SidePanel() {
  return (
    <div className={styles['panel-container']}>
      <p>게시글 리스트</p>
      <PostList />
    </div>
  );
}

export default SidePanel;
