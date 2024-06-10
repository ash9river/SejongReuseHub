import { useRecoilState } from 'recoil';
import { UserInterface } from 'configs/interface/UserInterface';
import { userState } from 'store/atom/UserAtom';
import { useEffect } from 'react';
import styles from './TextArea.module.scss';

interface ContentType {
  names: string;
  contents: string;
  titles: string;
}
function TextArea({ names, contents, titles }: ContentType) {
  const [user, setUser] = useRecoilState<UserInterface>(userState);
  useEffect(() => {
    setUser({
      ...user,
      nickname: names,
      content: contents,
      title: titles,
    });
  }, []);

  return (
    <div className={styles['textArea-wrapper']}>
      <div className={styles['profile-wrapper']}>
        {user.nickname}
        <img src="/img/sejonglogo.png" alt="logo" />
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
export default TextArea;
