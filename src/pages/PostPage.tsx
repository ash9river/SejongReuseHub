import React, { FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postFormData } from 'services/postForm';
import styles from './PostPage.module.scss';

interface FormDataObject {
  [key: string]: FormDataEntryValue | FormDataEntryValue[] | null;
}

function PostPage() {
  const { mutate } = useMutation({
    mutationFn: postFormData,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const categoryData = fd!.get('category');
    const data: FormDataObject = Object.fromEntries(fd.entries());
    data.category = categoryData;

    mutate({
      form: data,
    });
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
          <input type="submit" value="제출" className={styles.form__submit} />
        </form>
      </div>
    </div>
  );
}

export default PostPage;
