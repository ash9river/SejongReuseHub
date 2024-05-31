import { AxiosRequestConfig, isAxiosError } from 'axios';
import { apiRequester, setRequestDefaultHeader } from './api-requester';

const bracket = {};

const setRequsetPostHeader = <T>(data: T, config: AxiosRequestConfig) => {
  const modifiedConfig = setRequestDefaultHeader(config);
  if (data instanceof FormData) {
    modifiedConfig.headers = {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    };
  }
  return modifiedConfig;
};

/* axios.interceptors.request.use(
  (req) => {
    if (req.data instanceof FormData) {
      req.headers['Content-Type'] = 'multipart/form-data';
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  },
); */

export const postData = async <T>(
  url: string,
  data: T,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    console.log(data);

    const modifiedConfig = setRequsetPostHeader<T>(data, config || bracket);
    const response = await apiRequester.post<T>(url, data, modifiedConfig);
    console.error(response.data);

    return response.data;
  } catch (error) {
    console.log(error);

    if (isAxiosError(error)) throw new Error(error.message);
    else throw error;
  }
};
