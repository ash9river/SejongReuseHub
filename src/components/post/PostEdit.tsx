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
  const { data: board, isSuccess } = useQuery({
    queryKey: ['postList', postId],
    queryFn: ({ signal }) => getData<any>(`api/boards/${postId}`, signal),
  });

  // 사용자가 직전에 등록한 게시물의 상태를 그대로 보여주기 위해
  // 컴포넌트가 마운트되고 URI 파라미터에 해당하는 board를 가져와서
  // title, content, image의 상태를 바꿔줌
  // useEffect(() => {
  //   const getBoard = async () => {
  //     // const { data } = await axios.get(`/api/board/${board_id}`);
  //     // return data;
  //   };
  //   getBoard().then((result) => {
  //     // setTitle(result.title);
  //     // setContent(result.content);
  //     // 이미지는 파일을 불러올 필요가 없이 미리보기 url만 가져온다.
  //     // 이미지를 선택하지 않고 올리면 db에 저장되어 있는 이미지를 그대로 사용!
  //     // setImage({ ...image, preview_URL: `/api/image/view/${board_id}` });
  //   });
  // }, []);
  useEffect(() => {
    console.log(board);
  }, [board]);
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
  const handleSubmit = useCallback(async () => {
    try {
      const Data = {
        nickname: user.nickname,
        password: user.password,
        title: user.title,
        content: user.content,
        image: '',
        latitude: position.lat.toString(),
        longitude: position.lng.toString(),
      };

      console.log(Data);
      const response = await patchData(`api/boards/${postId}`, Data);
      // mutate({
      //   form: data,
      // });
      console.log(response);
      window.alert('등록이 완료되었습니다');
      navigate('/postView');
    } catch (e) {
      console.log('patch-error');
    }
  }, [canSubmit]);
  return (
    <div className={styles['addBoard-wrapper']}>
      <div className={styles['addBoard-header']}>게시물 수정하기 🖊️</div>
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
            수정힐 내용을 모두 입력하세요
          </Button>
        )}
      </div>
      <div className={styles['addBoard-body']}>
        {board && <TextArea contents={board.content} titles={board.title} />}
        <ImageUploader setImage={setImage} />
        <PostAddPostion position={position} setPosition={setPosition} />
      </div>
    </div>
  );
}

export default PostEdit;
