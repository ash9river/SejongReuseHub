import { http, HttpResponse } from 'msw';
import { dummyData } from 'services/boardData';
import { commentList } from 'services/commentData';
import { postItemType, postArray } from './postItem';
import { markers } from './marker';

export const handlers = [
  http.get('/hello', () => {
    console.log('msw:get :: /hello');
    return HttpResponse.json({
      data: 'Captured a "GET /hello" request',
    });
  }),

  http.get('/board', () => {
    // 임시로 추가한 데이터 전달
    console.log(dummyData);
    return HttpResponse.json(dummyData);
  }),
  // http.get('/board/count', () => {
  //   console.log(1);
  //   return HttpResponse.json(1);
  // }),
  http.get('/comment', () => {
    // 임시로 추가한 데이터 전달
    console.log(commentList);
    return HttpResponse.json(commentList);
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

  http.post('/post', async ({ request }) => {
    const data = await request.formData();
    console.log(data);
    const len = postArray.length;
    const newPost = {
      postId: len + 1,
      postTitle: data.get('title') || '',
      postContnet: data.get('content') || '',
    };
    const tmpArray = [...postArray, newPost];
    console.log(tmpArray);
  }),

  http.get('/markers', async () => {
    return HttpResponse.json(markers);
  }),

  // http.post('/postTest', async ({ request }) => {
  //   const data = await request.formData();
  //   const formArray: FormType[] = [];
  //   console.log(1111);
  //   console.log(data);
  //   const len = formArray.length;
  //   const newPost = {
  //     postId: len + 1,
  //     postTitle: data.get('title') || '',
  //     postContnet: data.get('content') || '',
  //   };
  //   const tmpArray = [...formArray, newPost];
  //   console.log(tmpArray);

  //   return HttpResponse.json(null, {
  //     status: 302,
  //   });
  // }),
];
