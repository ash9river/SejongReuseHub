import React, { FormEvent } from 'react';
import { FormType } from 'configs/interface/FormInterface';
import { useRecoilValue } from 'recoil';
import { formState } from 'store/atom/FormAtom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import styles from './PostPage.module.scss';

function PostPage() {
  const formData: FormType = useRecoilValue(formState); // Recoil 상태 읽기

  const mutation = useMutation({
    mutationFn: (formdata: FormType) => {
      return axios.post('/postTest', formdata);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    const categoryData = formdata.get('category') ?? '';
    const data: any = Object.fromEntries(formdata.entries());
    data.category = categoryData;

    mutation.mutate(data as FormType);
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

        {mutation.isPending ? (
          'Adding post...'
        ) : (
          <>
            {mutation.isError ? (
              <div>An error occurred: {mutation.error?.message}</div>
            ) : null}

            {mutation.isSuccess ? <div>Form added!</div> : null}
          </>
        )}
      </div>
    </div>
  );
}

export default PostPage;
