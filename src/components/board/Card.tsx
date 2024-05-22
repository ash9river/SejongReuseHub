import { useNavigate } from 'react-router-dom';
import styles from './Card.module.scss';

interface User {
  boardId: number;
  title: string;
  content: string;
  imgUrl: string;
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
        navigate(`/board/${boardId}`);
      }}
    >
      <div className={styles['card-wrapper']}>
        <div className={styles['card-body-img']}>
          <img src={imgUrl} alt="Img" />
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
