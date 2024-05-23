import { useRecoilState } from 'recoil';
import { UserInterface } from 'configs/interface/UserInterface';
import { userState } from 'store/atom/UserAtom';
import styles from './TextArea.module.scss';

function TextArea() {
  const [user, setUser] = useRecoilState<UserInterface>(userState);

  return (
    <div className={styles['textArea-wrapper']}>
      <input
        onChange={(e) => {
          setUser({
            ...user,
            title: e.target.value,
          });
        }}
        className="title"
        placeholder="제목을 입력하세요"
        value={user.title}
      />
      <textarea
        onChange={(e) => {
          setUser({
            ...user,
            content: e.target.value,
          });
        }}
        className={styles.text}
        placeholder="내용을 입력하세요"
        value={user.content}
      />
    </div>
  );
}
export default TextArea;
