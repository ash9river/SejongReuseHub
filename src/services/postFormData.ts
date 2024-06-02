import { postData } from './postData';

export async function postFormData(formdata: any) {
  try {
    const response = await postData('api/board', formdata.form);
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
