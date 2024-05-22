import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface Response<T> {
  data: T;
  status: string;
  severDataTime?: string;
  errorCode?: string;
  errorMessage?: string;
}

export const apiRequester: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL as string,
  timeout: 5000,
});

export const setRequestDefaultHeader = (
  requestConfig: AxiosRequestConfig,
  signal?: AbortSignal,
) => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
  };
  if (signal) {
    config.signal = signal;
  }
  return config;
};
