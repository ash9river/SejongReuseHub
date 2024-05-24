import { AxiosError } from 'axios';
import { postData } from './postData';

export async function postFormData(formdata: any, boardType: string) {
  try {
    const response = await postData(
      `/api/board?boardType=${boardType}`,
      formdata,
    );
    return response;
  } catch (err: any) {
    if (err.response) {
      console.error('data:', err.response.data);
      console.error('status:', err.response.status);
      console.error('headers:', err.response.headers);
    } else if (err.request) {
      console.error('Error request:', err.request);
    } else {
      console.error('General Error message:', err.message);
    }
    console.log('---------------------------');

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
