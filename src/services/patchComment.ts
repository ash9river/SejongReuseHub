import { AxiosRequestConfig, isAxiosError } from 'axios';
import { apiRequester, setRequestDefaultHeader } from './api-requester';

const bracket = {};

export const patchComment = async <T>(
  url: string,
  data: T,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const modifiedConfig = setRequestDefaultHeader(config || bracket);

    const response = await apiRequester.patch<T>(url, data, modifiedConfig);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.message);
    else throw error;
  }
};
