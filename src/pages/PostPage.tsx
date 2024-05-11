import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './PostPage.module.scss'; // PostPage.module.scss 파일을 import

interface FormData {
  title: string;
  content: string;
  author: string;
  password: string;
  category: string;
}

export default function PostPage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    author: '',
    password: '',
    category: 'general',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
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
                value={formData.author}
                onChange={handleChange}
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
                value={formData.category}
                onChange={handleChange} // handleChange 함수로 변경된 부분
                className={styles.formCategory}
              >
                <option value="share">나눔</option>
                <option value="exchange">교환</option>
                <option value="sale">판매</option>
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
                value={formData.title}
                onChange={handleChange}
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
                value={formData.content}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className={styles.formPWD}
              />
            </div>
          </label>
          <input type="submit" value="제출" className={styles.form__submit} />{' '}
        </form>
      </div>
    </div>
  );
}
