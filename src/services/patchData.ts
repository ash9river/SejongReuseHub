import { AxiosRequestConfig, isAxiosError } from 'axios';
import { apiRequester, setRequestDefaultHeader } from './api-requester';

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
  data: T,
  signal?: AbortSignal,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const modifiedConfig = setRequestDefaultPatchHeader(
      config || bracket,
      signal,
    );

    const response = await apiRequester.patch<T>(url, data, modifiedConfig);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.message);
    else throw error;
  }
};
