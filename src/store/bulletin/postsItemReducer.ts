import { Dispatch } from 'redux';
import { getUserData } from 'services/getData';
// 액션 함수의 타입 지정, 보통 '폴더명/액션타입명'
export const GETPOSTITEM = 'bulletin/GETPOSTITEM' as const;

// 액션함수
export const getPostItem = (payload: any) => ({
  type: GETPOSTITEM,
  payload,
});

// 액션 타입 지정
type PostsItemAction = ReturnType<typeof getPostItem>;

// 게시글 state 타입 지정
type PostItemState = {
  postItem: {
    title: string;
    content: string;
  };
};

// 게시글 처음 state
const initialState: PostItemState = {
  postItem: {
    title: '',
    content: '',
  },
};

// redux-thunk를 활용한 미들웨어
export const getPostItemWithThunk = (): ((
  dispatch: Dispatch,
) => Promise<void>) => {
  return async (dispatch: Dispatch) => {
    try {
      const userData = await getUserData('ash9river');

      const myData: PostItemState = {
        postItem: {
          title: userData.company,
          content: userData.html_url || '',
        },
      };

      dispatch({
        type: GETPOSTITEM,
        payload: myData,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
};

const postsItemReducer = (
  state: PostItemState = initialState,
  action: PostsItemAction,
) => {
  const { type, payload } = action;
  switch (type) {
    case GETPOSTITEM: {
      return {
        postItem: payload.postItem,
      };
    }
    default:
      return state;
  }
};

export default postsItemReducer;
