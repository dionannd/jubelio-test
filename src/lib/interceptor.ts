import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

const onRequest = (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers = {
    ...config.headers,
    ...(Cookies.get('token')
      ? { Authorization: `Bearer ${Cookies.get('token')}` }
      : {}),
  };

  return config as InternalAxiosRequestConfig;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    Cookies.remove('token');
    window.location.href = '/sign-in';
  }

  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance,
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
