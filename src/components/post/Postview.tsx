import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
// import { useSelector } from 'react-redux';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import moment from 'moment';
import { CommentInterface } from 'configs/interface/CommentInterface';
import { User } from 'configs/interface/UserInterface';
import { useQuery } from '@tanstack/react-query';
import { getData } from 'services/getData';
import styles from './Postview.module.scss';
// import api from '../../utils/api';
// import { jwtUtils } from '../../utils/jwtUtils';
import Comments from '../board/Comment';

interface postDetailItemType {
  id: number;
  user: any;
}

function PostView() {
  // URL 파라미터 받기 - board의 id
  const { postId } = useParams();
  const BoardId = 0;

  const { data: board, isSuccess } = useQuery({
    queryKey: ['postList', postId],
    queryFn: ({ signal }) => getData<any>(`api/boards/${postId}`, signal),
  });
  /*   const [board, setBoard] = useState<User>({
    id: 1,
    user: {
      boardId: 1,
      title: 'Sample Title',
      content: 'This is a sample content.',
      imgUrl: '../img/profile.jpg',
      username: 'john_doe',
      date: '2024-05-22',
      latitude: 0,
      longitude: 0,
    },
    created: '2024-05-22T10:00:00Z',
    title: 'User Sample Title',
    content: 'This is the user sample content.',
  }); */
  const [isLoaded, setIsLoaded] = useState(true);
  // const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);
  // board 가져오기
  // useEffect(() => {
  //   const getBoard = async () => {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_URL}/api/boards`,
  //     ); // console.log(response);
  //     return response;
  //   };
  //   getBoard()
  //     .then((result) => console.log(result))
  //     .then(() => setIsLoaded(true));
  // }, []);

  useEffect(() => {
    console.log(board);
  }, [board]);
  return (
    <>
      {board && (
        <div className={styles['board-wrapper']}>
          <div className={styles['edit-delete-button']}>
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteForeverOutlinedIcon />}
              className={styles['delete-button']}
              onClick={() => {
                setShow(true);
              }}
            >
              삭제
            </Button>
            <Button
              variant="outlined"
              endIcon={<BuildOutlinedIcon />}
              onClick={() => {
                navigate(`/edit-board/${board.boardId}`);
              }}
            >
              수정
            </Button>
          </div>
          <div className={styles['board-header']}>
            <div className={styles['board-header-username']}>
              {board.nickname}
            </div>
            <div className={styles['board-header-date']}>
              {moment(board.createdAt).add(9, 'hour').format('YYYY-MM-DD')}
            </div>
          </div>
          <hr />
          <div className={styles['board-body']}>
            <div className={styles['board-image']}>
              <img src={`/api/image/view/${board.boardId}`} alt="IMG" />
            </div>
            <div className={styles['board-title-content']}>
              <div className={styles['board-title']}>{board.title}</div>
              <div className={styles['board-content']}>{board.content}</div>
            </div>
          </div>
          <hr />
          <div className={styles['board-footer']}>
            <Comments boardId={board.boardId} />
          </div>
        </div>
      )}
      {/* modal */}
      <Dialog open={show}>
        <DialogContent style={{ position: 'relative' }}>
          <IconButton
            style={{ position: 'absolute', top: '0', right: '0' }}
            onClick={() => setShow(false)}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <div className={styles.modal}>
            <div className={styles['modal-title']}>
              {' '}
              정말 삭제하시겠습니까 ?
            </div>
            <div className={styles['modal-button']}>
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  setShow(false);
                  // 모달의 예 버튼 클릭시 게시물 삭제
                  // await api.delete(`/api/board/${board_id}`);
                  alert('게시물이 삭제되었습니다😎');
                  window.location.href = '/myboard-list';
                }}
              >
                예
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setShow(false);
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default PostView;
