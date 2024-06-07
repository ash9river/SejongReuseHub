import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CommentInterface } from 'configs/interface/CommentInterface';
import { JsxElement } from 'typescript';
import { getData } from 'services/getData';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postComment } from 'services/postComment';
import { queryClient } from 'index';
import { Password } from '@mui/icons-material';
import { patchComment } from 'services/patchComment';
import { deleteData } from 'services/deleteData';
import styles from './Comment.module.scss';
import CommentDeleteModal from './Modal/CommentDeleteModal';
import CommentEditModal from './Modal/CommentEditModal';

interface CommentProps {
  boardId: number;
}

function Comment({ boardId }: CommentProps) {
  // 로그인 후 현재 경로로 돌아오기 위해 useLocation 사용
  const location = useLocation();
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState<CommentInterface[]>([]);
  // 입력한 댓글 내용
  const [firstcontent, setfirstContent] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // const token = useSelector((state) => state.Auth.token);
  // 현재 페이지, 전체 페이지 갯수
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [deleteShow, setdeleteShow] = useState<number | null>(null);
  const [editShow, seteditShow] = useState<number | null>(null);
  function handleNicknameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewNickname(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword(e.target.value);
  }

  function handleDelete(id: number) {
    setdeleteShow(deleteShow === id ? null : id);
    seteditShow(null);
  }

  function handleEdit(id: number) {
    seteditShow(editShow === id ? null : id);
    setdeleteShow(null);
  }
  // 페이지에 해당하는 댓글 목록은 page 상태가 변경될 때마다 가져옴
  // 맨 처음 페이지가 1이므로 처음엔 1페이지에 해당하는 댓글을 가져온다
  const { data } = useQuery({
    queryKey: [`comments/${boardId}`],
    queryFn: ({ signal }) => getData<any>(`boards/${boardId}/comments`, signal),
  });

  const { mutate } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`comments/${boardId}`],
      });
    },
    onError: () => {
      console.log('mutate error');
    },
  });
  const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      password,
    }: {
      commentId: number;
      password: string;
    }) =>
      deleteData(`/comments/${commentId}`, {
        data: { password },
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`comments/${boardId}`],
      });
    },
    onError: () => {
      alert('오류가 발생했습니다. 다시 시도해주세요');
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
      password,
    }: {
      commentId: number;
      content: string;
      password: string;
    }) =>
      patchComment(`/comments/${commentId}`, {
        content,
        password,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`comments/${boardId}`],
      });
    },
    onError: () => {
      alert('오류가 발생했습니다. 다시 시도해주세요');
    },
  });

  const handleDeleteSubmit = (commentId: number, password: string) => {
    deleteCommentMutation.mutate({ commentId, password });
    setdeleteShow(null);
  };

  const handleEditSubmit = (
    commentId: number,
    content: string,
    password: string,
  ) => {
    editCommentMutation.mutate({ commentId, content, password });
    seteditShow(null);
  };

  // const { mutate } = useMutation({
  //   mutationFn: postComment,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [`boards/${boardId}/comments`],
  //     });
  //   },
  //   onError: () => {
  //     console.log('mutate error');
  //   },
  // });

  // 페이지 카운트는 컴포넌트가 마운트되고 딱 한번만 가져오면됨
  // useEffect(() => {
  //   // 댓글 전체 갯수 구하기
  //   // const getTotalBoard = async () => {
  //   //   const { data } = await axios.get(
  //   //     `/api/comment/count?board_id=${board_id}`,
  //   //   );
  //   //   return data.total;
  //   // };
  //   // // 페이지 카운트 구하기: (전체 comment 갯수) / (한 페이지 갯수) 결과 올림
  //   // getTotalBoard().then((result) => setPageCount(Math.ceil(result / 5)));
  //   setPageCount(1);
  // }, []);

  // 댓글 추가하기, 댓글 추가하는 API는 인증 미들웨어가 설정되어 있으므로
  // HTTP HEADER에 jwt-token 정보를 보내는 interceptor 사용
  /*   const submit = useCallback(async () => {
    const comment = {
      boardId,
      // DB에 엔터가 먹힌 상태로 들어가므로 제대로 화면에 띄우기 위해 <br>로 치환
      content,
      user_id: 'sins051301', // jwtUtils.getId(token),
    };
    console.log(comment);

    // axios interceptor 사용 : 로그인한 사용자만 쓸 수 있다!
  }, [content]); */

  const goLogin = () => {
    // setShow(false);
    // navigate(`/login?redirectUrl=${location.pathname}`);
  };
  // 로그인을 하지 않은 상태에서 댓글 입력 창을 클릭하면 Modal이 열림.
  const isLogin = () => {
    // if (!jwtUtils.isAuth(token)) {
    //   setShow(true);
    // }
  };

  const handleSubmit = useCallback(() => {
    const comment = {
      content: firstcontent,
      writer: newNickname,
      password: newPassword,
    };
    mutate({ comment, boardId });

    setfirstContent(''); // 댓글 입력 필드를 초기화
    setNewNickname('');
    setNewPassword('');
    setCommentList(data);
  }, [firstcontent, newNickname, newPassword]);

  return (
    <div className={styles['comments-wrapper']}>
      <div className={styles['comments-body']}>
        {data &&
          data.map((item: any, index: any) => (
            <div key={item.commentId} className={styles['comments-comment']}>
              <div className={styles['comment-username-date']}>
                <div className={styles['comment-date']}>
                  {moment(item.created)
                    .add(9, 'hour')
                    .format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
              <div className={styles['comment-content']}>{item.content}</div>
              <div className={styles['comment-username']}>익명 {index + 1}</div>
              <Button
                type="button"
                onClick={() => handleDelete(item.commentId)}
              >
                삭제
              </Button>
              <Button type="button" onClick={() => handleEdit(item.commentId)}>
                수정
              </Button>
              <hr />
              {deleteShow === item.commentId && (
                <CommentDeleteModal
                  onSubmit={(password: any) =>
                    handleDeleteSubmit(item.commentId, password)
                  }
                />
              )}
              {editShow === item.commentId && (
                <CommentEditModal
                  onSubmit={(password: string, NewComment: string) =>
                    handleEditSubmit(item.commentId, NewComment, password)
                  }
                />
              )}
            </div>
          ))}
      </div>
      <div className={styles['comments-header']}>
        <input
          className="comments-header-textarea"
          type="text"
          value={newNickname}
          onChange={handleNicknameChange}
          placeholder="닉네임"
        />
        <input
          className="comments-header-textarea"
          type="password"
          value={newPassword}
          onChange={handlePasswordChange}
          placeholder="패스워드"
        />
        <TextField
          className="comments-header-textarea"
          maxRows={3}
          onClick={isLogin}
          onChange={(e) => {
            setfirstContent(e.target.value);
          }}
          multiline
          placeholder="댓글을 입력해주세요✏️"
        />

        {firstcontent !== '' && newNickname !== '' && newPassword !== '' ? (
          <Button variant="outlined" onClick={handleSubmit} type="submit">
            등록하기
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            등록하기
          </Button>
        )}
      </div>

      {
        /*
          page(현재 페이지)와 pageCount(총 페이지 갯수)가 같으면 서버에서
          모든 댓글을 가져온 상태이므로 댓글 더보기 버튼이 보이지 않게 한다.
          page의 초기 상태가 1이기 때문에 컴포넌트가 마운트 된 후 첫페이지를 가져오고 만약 pageCount가 5이고
          현재 page가 4라면 버튼을 누르는 순간 page가 5가되어 마지막 페이지의 데이터를 가져온다.
        */
        page < pageCount && (
          <button
            type="button"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <div className={styles['comments-footer']}>
              댓글 더보기
              <KeyboardArrowDownIcon />
            </div>
          </button>
        )
      }
      {/* modal */}
      <Dialog open={show}>
        <DialogContent style={{ position: 'relative' }}>
          <IconButton
            style={{ position: 'absolute', top: '0', right: '0' }}
            onClick={() => {
              setShow(false);
            }}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <div className={styles.modal}>
            <div className={styles['modal-title']}>로그인이 필요합니다</div>
            <div className={styles['modal-content']}>
              로그인 페이지로 이동하시겠습니까?
            </div>
            <div className={styles['modal-button']}>
              <Button variant="outlined" color="error" onClick={goLogin}>
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
    </div>
  );
}
export default Comment;
