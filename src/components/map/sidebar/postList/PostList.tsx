import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isSideBarOpenState } from 'store/atom/SideBarAtom';
import { getData } from 'services/getData';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import styles from './PostList.module.scss';

interface BoardItem {
  boardId: number;
  title: string;
  createdAt: string;
  nickname: string;
  boardType: string;
}

interface BoardListInterface {
  boardListDto: BoardItem[];
  pageinfo: any;
}
function PostList() {
  const isSideBarOpen = useRecoilValue(isSideBarOpenState);
  const {
    data: postListItems,
    isLoading,
    isError,
  } = useQuery<BoardListInterface, AxiosError>({
    queryKey: ['postList'],
    queryFn: ({ signal }) => getData('api/boards?page=0&size=3', signal),
    staleTime: 5000,
  });
  const naviagte = useNavigate();

  function handleClick(boardId: number) {
    naviagte(`../postView/${boardId}`);
  }
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  return (
    <div className={styles.wrapper}>
      {postListItems !== undefined &&
        postListItems.boardListDto.map((item) => (
          <div
            className={styles.postContainer}
            key={item.boardId}
            onClick={() => handleClick(item.boardId)}
            aria-hidden
          >
            <div className={styles.image}>{null}</div>
            <div className={styles.textContainer}>
              <p className={styles.topBox}>
                <span className={styles.title}>{item.title}</span>{' '}
              </p>

              <p>
                <span className={styles.date}>
                  {formatDate(item.createdAt)}
                </span>
                <span className={styles.nickname}>{item.nickname}</span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PostList;
