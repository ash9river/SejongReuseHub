import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isSideBarOpenState } from 'store/atom/SideBarAtom';
import { getData } from 'services/getData';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import styles from './PostList.module.scss';

interface BoardItem {
  boardId: number;
  title: string;
  createdAt: string;
  nickname: string;
  content: string;
  image: string | null;
}
interface PageInfo {
  page: number;
  pageSize: number;
  totalNumber: number;
  totalPages: number;
}
interface BoardListResponse {
  boardListDto: BoardItem[];
  pageInfo: PageInfo;
}
function PostList() {
  const { data, isLoading, isError } = useQuery<BoardListResponse, AxiosError>({
    queryKey: ['postList', 0, 10],
    queryFn: ({ signal }) => getData(`api/boards?page=${0}&size=${10}`, signal),
    staleTime: 5000,
  });
  const naviagte = useNavigate();
  useEffect(() => {
    console.log(data);
  }, [data]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  const boardListDto = data?.boardListDto ?? [];
  return (
    <div className={styles.wrapper}>
      {boardListDto?.map((item) => (
        <div className={styles.postContainer} key={item.boardId}>
          <div className={styles.imageBox}>
            {item.image ? (
              <img
                src={item.image}
                alt="게시물 이미지"
                className={styles.image}
              />
            ) : (
              <p className={styles.noImage}>이미지가 존재하지 않습니다.</p>
            )}
          </div>
          <div className={styles.textContainer}>
            <p className={styles.topBox}>
              <span className={styles.title}>{item.title}</span>{' '}
            </p>
            <p className={styles.content}>{item.content}</p>
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
