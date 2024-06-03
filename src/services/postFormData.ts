import { postData } from './postData';

export interface FormDataEntryInterface {
  [k: string]: FormDataEntryValue;
}

interface FormDataInterFace {
  form: FormDataEntryInterface;
}

export async function postFormData(formdata: FormDataInterFace) {
  try {
    const newFormData = new FormData();

    newFormData.append('image', formdata.form.image);

    const imgResponse: any = await postData('api/images', newFormData);
    const imageItem = imgResponse?.image;

    const newPostFormData = new FormData();
    newPostFormData.append('nickname', formdata.form.nickname);
    newPostFormData.append('password', formdata.form.password);
    newPostFormData.append('title', formdata.form.title);
    newPostFormData.append('content', formdata.form.content);

    newPostFormData.append('image', imageItem);

    newPostFormData.append('latitude', formdata.form.latitude);
    newPostFormData.append('longitude', formdata.form.longitude);

    const response = await postData('api/board', newPostFormData);

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
