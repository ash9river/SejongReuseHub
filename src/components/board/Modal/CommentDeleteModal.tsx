// 모달 컴포넌트 추가
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

function CommentDeleteModal({ onSubmit }: any) {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // 아이디와 비밀번호를 이용하여 삭제 또는 수정 요청을 보냅니다.
    onSubmit(password);
    // 모달 상태 초기화
    setPassword('');
  };

  return (
    <div>
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="button" onClick={handleSubmit}>
        확인
      </Button>
    </div>
  );
}

export default CommentDeleteModal;
