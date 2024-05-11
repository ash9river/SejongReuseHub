import { http, HttpResponse } from 'msw';

const posts = ['게시글1', '게시글2', '게시글3'];

export interface postItemType {
  postId: number;
  postTitle: string;
  postContent: string;
}
interface PostItemType {
  postId: number;
  postTitle: string;
  postContent: string;
}
const postArray: postItemType[] = [
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

export const handlers = [
  http.get('/hello', () => {
    console.log('msw:get :: /hello');
    return HttpResponse.json({
      data: 'Captured a "GET /hello" request',
    });
  }),

  http.get('/post', async () => {
    const retItem = postArray;
    console.log(retItem);

    return HttpResponse.json(retItem);
  }),

  http.get('/post/:id', async ({ params }) => {
    const { id } = params;
    const retItem: postItemType | undefined = postArray.find(
      (postItem) => postItem.postId === +id,
    );

    console.log(retItem);

    return HttpResponse.json(retItem);
  }),
];
