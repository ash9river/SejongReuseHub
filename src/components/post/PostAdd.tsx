import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import Comment from 'components/board/Comment';
// import api from '../../utils/api';
// import { jwtUtils } from '../../utils/jwtUtils';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import TextArea from 'components/post/TextArea';

import { UserInterface } from 'configs/interface/UserInterface';
import { useRecoilState } from 'recoil';
import { userState } from 'store/atom/UserAtom';
import { Position } from 'configs/interface/KakaoMapInterface';
import MapModal from 'components/mapModal/MapModal';
import getGeolocation from 'utils/getGeolocation';
import { useMutation } from '@tanstack/react-query';
import ImageUploader from './ImageUploader';
import styles from './PostAdd.module.scss';
import PostAddPostion from './PostAddPostion';
import TextAddArea from './TextAddArea';
import {
  FormDataEntryInterface,
  postFormData,
} from '../../services/postFormData';

function PostAdd() {
  const { longitude, latitude } = getGeolocation();
  const [position, setPosition] = useState<Position>({
    lat: 0,
    lng: 0,
  });
  const { mutate } = useMutation({
    mutationFn: postFormData,
    onSuccess: () => navigate('/postView'),
  });

  // const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();

  // 게시판 제목, 내용, 사진
  const [user, setUser] = useRecoilState<UserInterface>(userState);
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: './img/profile.png',
  });
  const canSubmit = useCallback(() => {
    return (
      image.image_file !== '' &&
      user.content !== '' &&
      user.title !== '' &&
      position.lat !== 0 &&
      position.lng !== 0 &&
      user.nickname !== '' &&
      user.password !== ''
    );
  }, [image, user.title, user.content, user.latitude, user.longitude]);

  useEffect(() => {
    setPosition({
      lat: latitude,
      lng: longitude,
    });
  }, [latitude, longitude]);

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('nickname', user.nickname);
      formData.append('password', user.password);
      formData.append('title', user.title);
      formData.append('content', user.content);

      formData.append('image', image.preview_URL);

      formData.append('latitude', position.lat.toString());
      formData.append('longitude', position.lng.toString());
      // formData.append('user_id', jwtUtils.getId(token));
      const data: FormDataEntryInterface = Object.fromEntries(
        formData.entries(),
      );

      mutate({
        form: data,
      });
      window.alert('등록이 완료되었습니다');

      // navigate('/postView');
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      // toast.error(
      //   '오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다' + '😭',
      //   {
      //     position: 'top-center',
      //   },
      // );
      //
    }
  }, [canSubmit]);

  return (
    <div className={styles['addBoard-wrapper']}>
      <div className={styles['addBoard-header']}>게시물 등록하기</div>
      <div className={styles.submitButton}>
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className={styles['success-button']}
            variant="outlined"
          >
            등록하기
          </Button>
        ) : (
          <Button
            className={styles['disable-button']}
            variant="outlined"
            size="large"
          >
            사진과 내용을 모두 입력하세요
          </Button>
        )}
      </div>
      <div className={styles['addBoard-body']}>
        <TextAddArea />
        <ImageUploader setImage={setImage} />
        <PostAddPostion position={position} setPosition={setPosition} />
      </div>
    </div>
  );
}

export default PostAdd;
