import axios from 'axios';
import store from '../store';

// axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

/* eslint-disable no-console */
function parseError(error) {
  if (error.response.data.error === 'token_expired') {
    const user = store.getters['auth/getUser'];
    if (user && !user.remember) {
      store.dispatch('auth/logout');
    }
  }
  return error;
}

function parseBody(response) {
  if (response.status === 200) {
    return response.data;
  }
  return response.error;
}

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  crossdomain: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  (config) => {
    const apiConfig = config;
    const token = store.getters['auth/getToken'];
    if (token) {
      apiConfig.headers.Authorization = `Bearer ${token}`;
    }
    return apiConfig;
  },
  error => Promise.reject(error),
);

http.interceptors.response.use(response => parseBody(response),
  (error) => {
    parseError(error);
  });

export default http;
