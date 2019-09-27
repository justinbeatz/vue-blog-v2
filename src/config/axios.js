import axios from 'axios';
import store from '@/store';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') !== 'undefined' ? JSON.parse(localStorage.getItem('token')) : store.state.token;

    if (token) {
      store.dispatch('auth/setToken', token);
      config.headers = {
        Authorization: token,
      };
    }

    return config;
  },
  error => Promise.reject(error),
);

window.axios = axios;

export default axios;
