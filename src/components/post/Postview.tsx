import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
// import { useSelector } from 'react-redux';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
import { CommentInterface } from 'configs/interface/CommentInterface';
import { User } from 'configs/interface/UserInterface';

import { useQuery } from '@tanstack/react-query';
import { getData } from 'services/getData';
import { deleteData } from 'services/deleteData';

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

  const [isLoaded, setIsLoaded] = useState(true);
  // const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  useEffect(() => {
    console.log(board);
  }, [board]);
  const handleClose = () => {
    setPasswordShow(false);
  };
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
                setPasswordShow(true);
              }}
            >
              삭제
            </Button>
            <Button
              variant="outlined"
              endIcon={<BuildOutlinedIcon />}
              onClick={() => {
                navigate(`/postView/edit`);
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
      {/* 비밀번호 입력 */}
      <Dialog
        open={passwordShow}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log('password:', formJson.password);

            try {
              const response = await deleteData(
                `api/boards/${postId}`,
                formJson.password,
              );

              console.log(response);
              alert('게시물이 삭제되었습니다😎');
              setShow(true);
              handleClose();
              navigate('/postView');
            } catch (error) {
              console.error('Error deleting data:', error);
            }
            setShow(true);
            handleClose();
          },
        }}
      >
        <DialogTitle>비밀번호를 입력해주세요</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>{null}</DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="password"
            label="비밀번호"
            type="input"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button type="submit">삭제</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default PostView;
