import MapModal from 'components/mapModal/MapModal';
import { postFormData } from 'services/postFormData';

import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useCallback,
} from 'react';
import styles from './PostPage.module.scss';
import SelectLocation from '../components/mapModal/SelectLocation';
import Modal from '../components/UI/Modal';

interface FormData {
  title: string;
  content: string;
  nickname: string;
  image: string;
  password: string;
  latitude: number;
  longitude: number;
}
type ModalHandle = {
  open: () => void;
  close: () => void;
};
type coordinateType = {
  lat: number;
  lng: number;
};
function PostPage() {
  // const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<coordinateType>({
    lat: 0,
    lng: 0,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    // const categoryData = fd.get('category')?.toString() ?? '';
    const data: FormData = {
      title: fd.get('title') as string,
      content: fd.get('content') as string,
      image: '',
      nickname: fd.get('author') as string,
      password: fd.get('password') as string,
      latitude: location ? location.lat : 0,
      longitude: location ? location.lng : 0,
    };
    /* 
    try {
      const response = await postFormData(data);

      console.log('Response:', response);
      alert('게시글 업로드 완료!');
      // 성공적으로 전송된 후 추가적인 작업 수행
    } catch (error) {
      alert('통신 실패'); // 에러 객체의 상세 정보를 로그
      // 에러 객체의 상세 정보를 로그

      console.error('Error posting data:', error);
    } */

    // console.log(data);
  };

  const changeLocation = useCallback((prop: coordinateType) => {
    setLocation(prop);
  }, []);

  const modalRef = useRef<ModalHandle>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <form className={styles.postForm} onSubmit={handleSubmit}>
          <label
            className={`${styles.label} ${styles.writer}`}
            htmlFor="author"
          >
            <div className={styles.leftBox}>작성자</div>
            <div className={styles.rightBox}>
              <input
                type="text"
                id="author"
                name="author"
                className={styles.formWriter}
              />
            </div>
          </label>
          <label
            className={`${styles.label} ${styles.category}`}
            htmlFor="category"
          >
            <div className={styles.leftBox}>카테고리</div>
            <div className={styles.rightBox}>
              <select
                id="category"
                name="category"
                className={styles.formCategory}
              >
                <option value="Share">나눔</option>
                <option value="Change">교환</option>
                <option value="Sale">판매</option>
              </select>
            </div>
          </label>
          <label className={`${styles.label} ${styles.title}`} htmlFor="title">
            <div className={styles.leftBox}>제목</div>
            <div className={styles.rightBox}>
              <input
                type="text"
                id="title"
                name="title"
                className={styles.formTitle}
              />
            </div>
          </label>
          <label
            className={`${styles.label} ${styles.content}`}
            htmlFor="content"
          >
            <div className={styles.leftBox}>내용</div>
            <div className={styles.rightBox}>
              <textarea
                id="content"
                name="content"
                className={styles.formContent}
              />
            </div>
          </label>
          <label className={`${styles.label} ${styles.pwd}`} htmlFor="password">
            <div className={styles.leftBox}>비밀번호:</div>
            <div className={styles.rightBox}>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.formPWD}
              />
            </div>
          </label>
          <div className={styles.label}>
            <div className={styles.leftBox}>위치 설정:</div>
            <div className={styles.rightBox}>
              <div className={styles.positionBox}>
                <div className={styles.positionText}>
                  <div className={styles.textWidth}>
                    위도 :
                    <span>{location ? location.lat.toFixed(4) : null}</span>
                  </div>
                  <div className={styles.textWidth}>
                    경도 :
                    <span>{location ? location.lng.toFixed(4) : null}</span>
                  </div>
                </div>
                <button
                  className={styles.mapModal}
                  type="button"
                  onClick={openModal}
                >
                  {null}
                </button>
              </div>
            </div>
          </div>
          <Modal ref={modalRef}>
            <MapModal
              lat={location ? location.lat : 0}
              lon={location ? location.lng : 0}
              closeModal={closeModal}
            >
              <SelectLocation changeLocation={changeLocation} />
            </MapModal>
          </Modal>
          <input type="submit" value="제출" className={styles.form__submit} />{' '}
        </form>
      </div>
    </div>
  );
}

export default PostPage;
