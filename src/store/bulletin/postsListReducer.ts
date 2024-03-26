// 액션 함수의 타입 지정, 보통 '폴더명/액션타입명'
export const FETCHPOSTLIST = 'bulletin/FETCHPOSTLIST' as const;

// 액션함수
export const fetchPostList = (payload: postListItem[]) => ({
  type: FETCHPOSTLIST,
  payload,
});

// 액션 함수의 타입
type postListAction = ReturnType<typeof fetchPostList>;

// 게시글 타입
export type postListItem = {
  id: number;
  title: string;
  content: string;
};

// state 타입(게시글 배열 타입)
type postListState = {
  currnetIndex: number;
  postListItems: postListItem[];
};

// 초기 state
const initialState: postListState = {
  currnetIndex: -1,
  postListItems: [],
};

// currentIndex가 -1일 경우 백에서 최신 index 업데이트 후 리스트 가져오기
// currentIndex가 20이하일경우 전부

const postListReducer = (
  state: postListState = initialState,
  action: postListAction,
) => {
  switch (action.type) {
    case FETCHPOSTLIST: {
      return state;
    }
    default:
      return state;
  }
};

export default postListReducer;
