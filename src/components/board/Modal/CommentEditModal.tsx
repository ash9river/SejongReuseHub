// 모달 컴포넌트 추가
import { Button, Dialog, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from './CommentEditModal.module.scss';

function CommentEditModal({ onSubmit }: any) {
  const [NewComment, setNewComment] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // 아이디와 비밀번호를 이용하여 삭제 또는 수정 요청을 보냅니다.
    onSubmit(password, NewComment);
    // 모달 상태 초기화
    setPassword('');
    setNewComment('');
  };

  return (
    <div className={styles['modal-wrap']}>
      <TextField
        className="comments-header-textarea"
        maxRows={3}
        onChange={(e) => {
          setNewComment(e.target.value);
        }}
        multiline
        placeholder="댓글을 수정해주세요✏️"
      />
      <div className={styles['confirm-wrap']}>
        <Button
          className={styles['button-wrap']}
          type="button"
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

export default CommentEditModal;
