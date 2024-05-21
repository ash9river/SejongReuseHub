import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormType } from 'configs/interface/FormInterface';
import styles from './PostViewPage.module.scss';

function PostViewPage() {
  const [posts, setPosts] = useState<FormType[]>([
    {
      title: '나눔',
      content: '어쩌구',
      author: '신혁수',
      category: '나눔',
      password: 'ㄴㄹㄴㄹ',
    },
    {
      title: '나눔',
      content: '어쩌구',
      author: '신혁수',
      category: '나눔',
      password: 'ㄴㄹㄴㄹ',
    },
  ]);

  useEffect(() => {
    // 데이터를 서버에서 가져오는 함수
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts'); // API 엔드포인트에 맞게 수정
        setPosts([...posts, response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles['content-wrap']}>
      <table className={styles['list-table']}>
        <thead>
          <tr>
            <th className={styles.table}>번호</th>
            <th className={styles.table}>제목</th>
            <th className={styles.table}>카테고리</th>
            <th className={styles.table}>내용</th>
            <th className={styles.table}>작성자</th>
            <th className={styles.table}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post, idx: number) => (
              <tr key={0}>
                <td width="70">{idx + 1}</td>
                <td width="110">
                  <a href="..">{post.title}</a>
                </td>
                <td width="180">{post.category}</td>
                <td width="500">{post.content}</td>
                <td width="120">{post.author}</td>
                <td width="110">2024-05-13</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PostViewPage;
