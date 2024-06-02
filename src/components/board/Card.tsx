import { useNavigate } from 'react-router-dom';
import styles from './Card.module.scss';

interface User {
  boardId: number;
  title: string;
  content: string;
  imgUrl: string | null;
  username: string;
  date: string;
}
export function Card({
  boardId,
  title,
  content,
  imgUrl,
  username,
  date,
}: User) {
  const navigate = useNavigate();
  return (
    <button
      className={styles['button-style']}
      type="button"
      onClick={() => {
        navigate(`./${boardId}`);
      }}
    >
      <div className={styles['card-wrapper']}>
        <div className={styles['card-body-img']}>
          {imgUrl ? (
            <img src={imgUrl} alt="게시물 이미지" className={styles.image} />
          ) : (
            <p className={styles.noImage}>이미지가 존재하지 않습니다.</p>
          )}
        </div>
        <div className={styles['card-body-text']}>
          <div className={styles['card-body-text-title']}>{title}</div>
          <div className={styles['card-body-text-content']}>{content}</div>
        </div>
        <div className={styles['card-footer']}>
          <div className={styles.username}>{username}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
    </button>
  );
}
