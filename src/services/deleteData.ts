import { AxiosRequestConfig, isAxiosError } from 'axios';
import { apiRequester, setRequestDefaultHeader } from './api-requester';

const bracket = {};

const setRequestDefaultDeleteHeader = <T>(
  data: T,
  config: AxiosRequestConfig,
  signal?: AbortSignal,
) => {
  const modifiedConfig = setRequestDefaultHeader(config);
  modifiedConfig.data = {
    ...config.data,
    password: data,
  };
  modifiedConfig.signal = signal;

  return modifiedConfig;
};

export const deleteData = async <T>(
  url: string,
  data: T,
  signal?: AbortSignal,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const modifiedConfig = setRequestDefaultDeleteHeader(
      data,
      config || bracket,
      signal,
    );

    const response = await apiRequester.delete<T>(url, modifiedConfig);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.message);
    else throw error;
  }
};
