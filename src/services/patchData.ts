import { AxiosRequestConfig, isAxiosError } from 'axios';
import { apiRequester, setRequestDefaultHeader } from './api-requester';
import { postData } from './postData';

const bracket = {};

const setRequestDefaultPatchHeader = <T>(
  config: AxiosRequestConfig,
  signal?: AbortSignal,
) => {
  const modifiedConfig = setRequestDefaultHeader(config);

  modifiedConfig.signal = signal;

  return modifiedConfig;
};

export const patchData = async <T>(
  url: string,
  data: any,
  isChanged: boolean,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const modifiedConfig = setRequestDefaultPatchHeader(config || bracket);
    console.log('a');

    if (data.image) {
      if (isChanged) {
        const newFormData = new FormData();

        newFormData.append('image', data.image);
        const imgResponse: any = await postData('api/images', newFormData);
        // eslint-disable-next-line no-param-reassign
        data.image = imgResponse?.image;
        console.log('B');
      }
    }
    console.log('c');

    const response = await apiRequester.patch<T>(url, data, modifiedConfig);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.message);
    else throw error;
  }
};
