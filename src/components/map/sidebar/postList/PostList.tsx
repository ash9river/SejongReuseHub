import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isSideBarOpenState } from 'store/atom/SideBarAtom';
import { getData } from 'services/getData';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import styles from './PostList.module.scss';

interface BoardItem {
  boardId: number;
  title: string;
  createdAt: string;
  nickname: string;
  boardType: string;
}
function PostList() {
  const isSideBarOpen = useRecoilValue(isSideBarOpenState);
  const { data, isLoading, isError } = useQuery<BoardItem[], AxiosError>({
    queryKey: ['postList'],
    queryFn: ({ signal }) => getData('api/boards', signal),
    staleTime: 5000,
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  return (
    <div className={styles.wrapper}>
      {data?.map((item) => (
        <div className={styles.postContainer} key={item.boardId}>
          <div className={styles.image}>{null}</div>
          <div className={styles.textContainer}>
            <p className={styles.topBox}>
              <span className={styles.title}>{item.title}</span>{' '}
            </p>
            <p className={styles.content}>
              사용감 없는 새상품입니다.! 상세샷 원하시면 보내드릴게요 사용감
              없는 새상품입니다.! 상세샷 원하시면 보내드릴게요 사용감 없는
              새상품입니다.! 상세샷 원하시면 보내드릴게요
            </p>
            <p>
              <span className={styles.date}>{formatDate(item.createdAt)}</span>
              <span className={styles.nickname}>{item.nickname}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
