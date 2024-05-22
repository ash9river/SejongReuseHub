import { Pagination } from '@mui/material';
import { Card } from 'components/board/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { UserInterface } from 'configs/interface/UserInterface';
import styles from './BoardList.module.scss';

interface Item {
  id: number;
  user: UserInterface;
  created: string;
  title: string;
  content: string;
}

function BoardList() {
  const [pageCount, setPageCount] = useState(0);
  const [boardList, setBoardList] = useState<Item[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // 렌더링 되고 한번만 전체 게시물 갯수 가져와서 페이지 카운트 구하기
  // 렌더링 되고 한번만 페이지에 해당하는 게시물 가져오기
  useEffect(() => {
    setPageCount(3);
    // setBoardList(dummyData);
    // 페이지에 해당하는 게시물 가져오기
    const getBoardList = async () => {
      // const Pagenumber = searchParams.get('page');
      const { data } = await axios.get('/board');
      return data;
    };
    // 현재 페이지에 해당하는 게시물로 상태 변경하기
    getBoardList().then((result) => setBoardList(result));
    // 게시물 전체 갯수 구하기
    // const getTotalBoard = async () => {
    //   const { data } = await axios.get('/board/count');
    //   return data.total;
    // };
    // // 페이지 카운트 구하기: (전체 board 갯수) / (한 페이지 갯수) 결과 올림
    // getTotalBoard().then((result) => setPageCount(Math.ceil(result / 4)));
  }, []);

  return (
    <div className={styles['boardList-wrapper']}>
      <div className={styles['boardList-header']}>재활용 게시물 📝</div>
      <div className={styles['boardList-body']}>
        {boardList.map((item, index) => (
          <Card
            key={item.id}
            username={item.user.username}
            date={moment(item.created).add(9, 'hour').format('YYYY-MM-DD')}
            title={item.title}
            content={item.content}
            boardId={item.id}
            imgUrl={`../img/test${item.id}.jpg`}
          />
        ))}
      </div>
      <div className="boardList-footer">
        {/* 페이지네이션: count에 페이지 카운트, page에 페이지 번호 넣기 */}
        <Pagination
          variant="outlined"
          color="primary"
          page={Number(searchParams.get('page'))}
          count={pageCount}
          size="large"
          onChange={(e, value) => {
            // window.location.href = `/board-list?page=${value}`;
          }}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
}
export default BoardList;
