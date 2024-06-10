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
import { postData } from 'services/postData';
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

  const [canEdit, setCanEdit] = useState(false);
  function handleNicknameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewNickname(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword(e.target.value);
  }

  function handleDelete(id: number) {
    setdeleteShow(deleteShow === id ? null : id);
    seteditShow(null);
    setCanEdit(false);
  }

  function handleEdit(id: number) {
    setCanEdit(false);
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
      //
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      password,
    }: {
      commentId: number;
      password: string;
    }) => deleteData(`/comments/${commentId}`, password),
    onSuccess: () => {
      alert('댓글이 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: [`comments/${boardId}`],
      });
      setCanEdit(false);
    },
    onError: () => {
      setCanEdit(false);
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
      setCanEdit(false);
      queryClient.invalidateQueries({
        queryKey: [`comments/${boardId}`],
      });
    },
    onError: () => {
      alert('오류가 발생했습니다. 다시 시도해주세요');
    },
  });

  const checkEditMutation = useMutation({
    mutationFn: ({
      commentId,
      password,
    }: {
      commentId: number;
      password: string;
    }) =>
      postData(`/comments/password?commentId=${commentId}`, {
        password,
      }),
    onSuccess: () => {
      setCanEdit(true);
    },
    onError: () => {
      alert('비밀번호가 틀립니다. 다시 시도해주세요.');
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

  function checkHandleEditSubmit(commentId: number, password: string) {
    checkEditMutation.mutate({
      commentId,
      password,
    });
  }

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
                className={styles['delete-button']}
                type="button"
                onClick={() => handleDelete(item.commentId)}
              >
                삭제
              </Button>
              <Button
                className={styles['edit-button']}
                type="button"
                onClick={() => handleEdit(item.commentId)}
              >
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
              {editShow === item.commentId &&
                (canEdit === false ? (
                  <CommentDeleteModal
                    onSubmit={(password: any) =>
                      checkHandleEditSubmit(item.commentId, password)
                    }
                  />
                ) : (
                  <CommentEditModal
                    onSubmit={(password: string, NewComment: string) =>
                      handleEditSubmit(item.commentId, NewComment, password)
                    }
                  />
                ))}
            </div>
          ))}
      </div>
      <div className={styles['comments-header']}>
        <div className={styles.info}>
          <input
            className={styles['comments-header-textarea']}
            type="text"
            value={newNickname}
            onChange={handleNicknameChange}
            placeholder="닉네임"
          />
          <input
            className={styles['comments-header-textarea']}
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="패스워드"
          />
        </div>
        <TextField
          className={styles['comments-header-textarea']}
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
