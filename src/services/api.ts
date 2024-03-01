import axios, { AxiosError, AxiosInstance } from 'axios';
import { createBrowserHistory } from 'history';
import { AppRoute } from '../const';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';

const BACKEND_URL = 'https://camera-shop.accelerator.htmlacademy.pro/';
const REQUEST_TIMEOUT = 5000;
const browserHistory = createBrowserHistory();

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      if (error.response?.status === StatusCodes.NOT_FOUND) {
        browserHistory.push(AppRoute.NotFound);
      }
      throw error;
    }
  );

  return api;
};
