import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from 'store';
import { getPostItemWithThunk } from 'store/bulletin/postsItemReducer';

export default function ThisIsTmp() {
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
