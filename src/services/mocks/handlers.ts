import { http, HttpResponse } from 'msw';
import { dummyData } from 'services/boardData';
import { commentList } from 'services/commentData';
import { postItemType, postArray } from './postItem';
import { markers } from './marker';

export const handlers = [
  http.get('/hello', () => {
    return HttpResponse.json({
      data: 'Captured a "GET /hello" request',
    });
  }),

  http.get('/board', () => {
    // 임시로 추가한 데이터 전달
    return HttpResponse.json(dummyData);
  }),

  http.get('/comment', () => {
    // 임시로 추가한 데이터 전달
    return HttpResponse.json(commentList);
  }),

  http.get('/post', async () => {
    const retItem = postArray;

    return HttpResponse.json(retItem);
  }),

  http.get('/post/:id', async ({ params }) => {
    const { id } = params;
    const retItem: postItemType | undefined = postArray.find(
      (postItem) => postItem.postId === +id,
    );

    return HttpResponse.json(retItem);
  }),

  http.post('/post', async ({ request }) => {
    const data = await request.formData();
    const len = postArray.length;
    const newPost = {
      postId: len + 1,
      postTitle: data.get('title') || '',
      postContnet: data.get('content') || '',
    };
    const tmpArray = [...postArray, newPost];
  }),

  http.get('/markers', async () => {
    return HttpResponse.json(markers);
  }),
];
