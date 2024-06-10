import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { UserInterface } from 'configs/interface/UserInterface';
import { userState } from 'store/atom/UserAtom';
import { Position } from 'configs/interface/KakaoMapInterface';
import { patchData } from 'services/patchData';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getData } from 'services/getData';
import getGeolocation from 'utils/getGeolocation';
import ImageUploader from './ImageUploader';
import TextArea from './TextArea';
import PostAddPostion from './PostAddPostion';
import styles from './PostEdit.module.scss';

// import axios from 'axios';
import {
  FormDataEntryInterface,
  postFormData,
} from '../../services/postFormData';
// import { toast } from 'react-toastify';
function PostEdit() {
  // const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  // URI 파라미터 가져오기
  const { postId } = useParams();
  // 게시판 제목, 내용, 사진
  // 게시판 제목, 내용, 사진
  const [user, setUser] = useRecoilState<UserInterface>(userState);
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: './img/profile.png',
  });
  const [position, setPosition] = useState<Position>({
    lat: 0,
    lng: 0,
  });
  const { longitude, latitude } = getGeolocation();

  const { data: board, isSuccess } = useQuery({
    queryKey: ['postList', postId],
    queryFn: ({ signal }) => getData<any>(`api/boards/${postId}`, signal),
  });

  useEffect(() => {
    setPosition({
      lat: latitude,
      lng: longitude,
    });
  }, [latitude, longitude]);

  const canSubmit = useCallback(() => {
    return (
      (image.preview_URL !== '' || board.image !== '') &&
      user.content !== '' &&
      user.title !== '' &&
      position.lat !== 0 &&
      position.lng !== 0 &&
      board.nickname !== '' &&
      board.password !== ''
    );
  }, [
    image,
    board,
    user.title,
    position,
    user.content,
    user.latitude,
    user.longitude,
  ]);

  const handleSubmit = useCallback(async () => {
    try {
      const Data = {
        title: user.title,
        content: user.content,
        image: '',
        latitude: position.lat.toString(),
        longitude: position.lng.toString(),
      };
      let isChanged = true;
      if (image.preview_URL === './img/profile.png') {
        Data.image = board.image;
        isChanged = false;
      } else Data.image = image.preview_URL;
      const response = await patchData(`api/boards/${postId}`, Data, isChanged);

      window.alert('수정이 완료되었습니다');
      navigate('/postView');
    } catch (e) {
      //
    }
  }, [canSubmit]);
  return (
    <div className={styles['addBoard-wrapper']}>
      <div className={styles['addBoard-header']}>게시물 수정하기</div>
      <div className={styles.submitButton}>
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className={styles['success-button']}
            variant="outlined"
          >
            수정하기
          </Button>
        ) : (
          <Button
            className={styles['disable-button']}
            variant="outlined"
            size="large"
          >
            수정할 내용을 모두 입력하세요
          </Button>
        )}
      </div>
      <div className={styles['addBoard-body']}>
        {board && (
          <TextArea
            names={board.nickname}
            contents={board.content}
            titles={board.title}
          />
        )}
        <ImageUploader setImage={setImage} />
        {board && (
          <PostAddPostion position={position} setPosition={setPosition} />
        )}
      </div>
    </div>
  );
}

export default PostEdit;
