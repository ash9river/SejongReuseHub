import { postData } from './postData';

interface CommentType {
  content: string;
  writer: string;
  password: string;
}

interface PostDataType {
  comment: CommentType;
  boardId: number;
}

export async function postComment({ comment, boardId }: PostDataType) {
  try {
    console.log(comment);
    const response = await postData(`comments?boardId=${boardId}`, comment);

    console.log(response);

    return response;
  } catch (err: any) {
    if (err.response) {
      const error: any = new Error(
        'An error occurred while creating the event',
      );
      error.code = err.response.status;
      error.info = err.response.data;
      throw error;
    } else {
      throw new Error('An error occurred while fetching the events');
    }
  }
}
