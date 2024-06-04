import { Pagination } from '@mui/material';
import { Card } from 'components/board/Card';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { UserInterface } from 'configs/interface/UserInterface';

import { getData } from 'services/getData';
import { useQuery } from '@tanstack/react-query';
import styles from './BoardList.module.scss';
import { User } from '../../configs/interface/UserInterface';

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
function BoardList() {
  const [pageCount, setPageCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isError, refetch } = useQuery<
    BoardListResponse,
    AxiosError
  >({
    queryKey: ['postList', pageCount, 9],
    queryFn: ({ signal }) =>
      getData(`api/boards?page=${pageCount - 1}&size=${9}`, signal),
    staleTime: 5000,
  });
  const boardListDto = data?.boardListDto ?? [];

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={styles['boardList-wrapper']}>
      <div className={styles['boardList-header']}>재활용 게시물 📝</div>
      <div className={styles['boardList-body']}>
        {boardListDto !== undefined &&
          boardListDto.map((item, index) => (
            <Card
              key={item.boardId}
              nickname={item.nickname}
              date={moment(item.createdAt).add(9, 'hour').format('YYYY-MM-DD')}
              title={item.title}
              content={item.content}
              boardId={item.boardId}
              imgUrl={item.image ? `../img/test${item.boardId}.jpg` : null}
              // imgUrl="../img/profile.png"
            />
          ))}
      </div>
      <div className={styles['boardList-footer']}>
        {/* 페이지네이션: count에 페이지 카운트, page에 페이지 번호 넣기 */}
        <Pagination
          variant="outlined"
          color="primary"
          // page={Number(searchParams.get('page'))}
          page={pageCount}
          count={data?.pageInfo.totalPages ? data.pageInfo.totalPages - 1 : 0}
          size="large"
          onChange={async (e, value) => {
            // window.location.href = `/board-list?page=${value}`;
            setPageCount(value);
            await refetch();
          }}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
}
export default BoardList;
