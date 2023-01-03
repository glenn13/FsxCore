import axios, {AxiosResponse} from 'axios';
import config from '@app/config/default';
import userService from '@app/services/user.service';
import {logout} from './auth.service';
import {decryptMe} from '@app/utils/encryption.util';
import _ from 'lodash';
import {RequestHeader} from '@app/entities/RequestHeader';

export type HttpResponse<T = any> = AxiosResponse<T>;

let jwtHeader = '';

axios.defaults.baseURL = config.App.apiUrl;

axios.interceptors.request.use(
  async config => {
    const token = userService.Local.currentUser.get()?.jwtToken;

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    const requestHeaders = decryptMe<RequestHeader>(localStorage.getItem('X-HEADERS') || '');
    if (requestHeaders) {
      Object.keys(requestHeaders).forEach(header => {
        config.headers[`x-${header}`] = _.get(requestHeaders, header);
      });
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  success => Promise.resolve(success as HttpResponse),
  error => {
    const originalRequest = error.config;
    const expectedError =
      error.response && error.response.status >= 400 && error.response.status < 500;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = userService.Local.currentUser.get()?.refreshToken;

      originalRequest._retry = true;

      axios
        .post('/authenticate/refresh-token', {
          token: refreshToken,
        })
        .then(res => {
          if (res.status === 200) {
            //put token to LocalStorage
            userService.Local.currentUser.set(res.data);
            //change Authorization header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.jwtToken;
            //return originalRequest object with Axios.
            return axios(originalRequest);
          }
        })
        .catch(err => {
          logout();
          localStorage.clear();
          sessionStorage.clear();
        });
    }

    // soon implement a logger service
    if (!expectedError) {
      console.log('Logging the error', error);
    }

    return Promise.reject(error);
  },
);

export const generateArrayQuery = (key: string, values: UrlParam[]) =>
  values.reduce((final, value) => `${final}${key}=${value}&`, '');

export const getJwtHeaderAuth = () => jwtHeader;

export function setJwtHeaderAuth(jwt: string) {
  // return authorization header with jwt token
  jwtHeader = jwt;
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export function setProjectHeaderAuth(projectId: UrlParam) {
  axios.defaults.headers.common['x-project'] = projectId;
}

export function setProjectSiteHeaderAuth(projectSiteId: UrlParam) {
  axios.defaults.headers.common['x-project-site'] = projectSiteId;
}

export function clearProjectOrProjectSiteHeaders() {
  delete axios.defaults.headers.common['x-project'];
  delete axios.defaults.headers.common['x-project-site'];
}

axios.defaults.headers['Access-Control-Allow-Origin'] = `*`;

export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
};
