import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from 'axios';

interface Response<T> {
  data: T;
  status: string;
  severDataTime?: string;
  errorCode?: string;
  errorMessage?: string;
}

const apiRequester: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
});

const setRequestDefaultHeader = (requestConfig: AxiosRequestConfig) => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
  };
  return config;
};

const breaket = {};

export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const modifiedConfig = setRequestDefaultHeader(config || breaket);
    const response = await apiRequester.get<T>(url, modifiedConfig);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.message);
    else throw error;
  }
};
