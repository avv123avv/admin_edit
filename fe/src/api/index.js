import Axios from 'axios';

const API_ROOT = 'http://localhost:3006';

const config = {
  baseURL: API_ROOT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  responseType: 'json'
};

function api(configParams = {}) {
  const axios = Axios.create({ ...config, ...configParams });

  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(response => response, (error) => {
    if (error.response.status === 403) {
      if (window.location.href.indexOf('/login') === -1) {
        window.location = '/login';
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.response.data);
  });

  return axios;
}

export default api;
