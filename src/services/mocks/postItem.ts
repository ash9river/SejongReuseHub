export const posts = ['게시글1', '게시글2', '게시글3'];

export interface postItemType {
  postId: number;
  postTitle: string;
  postContent: string;
}

export const postArray: postItemType[] = [
  {
    postId: 1,
    postTitle: '가나다라마바사',
    postContent: '아자차카타파하',
  },
  {
    postId: 2,
    postTitle: '가나다라마바사',
    postContent: '아자차카타파하',
  },
  {
    postId: 3,
    postTitle: '가나다라마바사',
    postContent: '아자차카타파하',
  },
];
