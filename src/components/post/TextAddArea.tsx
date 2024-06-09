import { useRecoilState } from 'recoil';
import { UserInterface } from 'configs/interface/UserInterface';
import { userState } from 'store/atom/UserAtom';
import { useEffect } from 'react';
import styles from './TextAddArea.module.scss';

interface ContentType {
  contents: string;
  titles: string;
}
function TextAddArea() {
  const [user, setUser] = useRecoilState<UserInterface>(userState);

  return (
    <div className={styles['textArea-wrapper']}>
      <div className={styles['profile-wrapper']}>
        {/* <div className={styles.label}>id </div> */}
        <input
          onChange={(e) => {
            setUser({
              ...user,
              nickname: e.target.value,
            });
          }}
          className="id"
          type="text"
          value={user.nickname}
          placeholder="아이디"
          required
        />
        {/* <div className={styles.label}>password </div> */}
        <input
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
          className="password"
          type="password"
          value={user.password}
          placeholder="비밀번호"
          required
        />
      </div>
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
export default TextAddArea;
