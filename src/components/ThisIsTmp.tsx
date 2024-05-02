import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from 'services/api-requester';
import { postItemType } from 'services/mocks/postItem';

import { AppDispatch, RootState } from 'store';
import { getPostItemWithThunk } from 'store/bulletin/postsItemReducer';

/* export default function ThisIsTmp() {
  // useSelector를 통한 redux의 reducer 데이터 조회
  const postItem = useSelector(
    (state: RootState) => state.postsItemReducer.postItem,
  );

  // useDispatch를 통한 액션
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostItemWithThunk());
  }, [dispatch]);

  return (
    <p>
      <h1>{postItem ? postItem.title : 'no'}</h1>
      <h3>{postItem ? postItem.content : 'data'}</h3>
    </p>
  );
}
 */

export default function ThisIsTmp() {
  const [data, setData] = useState<postItemType[]>();

  useEffect(() => {
    async function fetchData() {
      const tmp = await getData<postItemType[]>('/post');
      setData(tmp);
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <p>below</p>
      {data !== undefined ? (
        <ul>
          {data.map((item) => (
            <li key={item.postId}>
              <p>id : {item.postId}</p>
              <p>title : {item.postTitle} </p>
              <p>content : {item.postContent}</p>
            </li>
          ))}
        </ul>
      ) : (
        'awaiting...'
      )}
    </>
  );
}
