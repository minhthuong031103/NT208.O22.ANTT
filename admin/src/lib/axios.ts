/** @format */

import axios from 'axios';
import { useKey } from '@hooks/useKey';
// import { IKeyAuth } from 'types';
import { KEY_CONTEXT } from './constants';
// import {store} from 'store/createStore';

const config = {
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URI,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const axiosClient = axios.create(config);

axiosClient.interceptors.request.use(
  async (req: any) => {
    const { getKey } = useKey();
    const token = await getKey(KEY_CONTEXT.ACCESS_TOKEN);
    // if (token) {
    //   req.headers.Authorization = `Bearer ${token}`;
    // }
    req.headers = `Bearer ${token || ''}`;
    return req;
  },
  (err: any) => Promise.reject(err),
);

axiosClient.interceptors.response.use(
  (res: any) => Promise.resolve(res.data),
  async (err: any) => {
    // const originalRequest = err.config;
    // console.log('err.response.status', err.response.status, err.config.__isRetryRequest);

    if (err && err.response && err.response.status === 401 && !err.config.__isRetryRequest) {
      // const { setKeySite } = useKey();
      // const refreshToken = getKey(KEY_CONTEXT.REFRESH_TOKEN);
      // const salt = encryptRSA(`${getCurrentTS()}`);
      // const params = JSON.stringify({
      //   ...REFRESH_TOKEN_ACT,
      //   data: [{ refreshToken }],
      // }).replace(/\\n/g, '');
      // return axios
      //   .post(`${import.meta.env.REACT_APP_BASE_URI}${import.meta.env.REACT_APP_GETWAY}`, {
      //     headers: config.headers,
      //   })
      //   .then(async (response: any) => {
      //     const authToken = response.data.result.data.token;
      //     const rfTK = response.data.result.data.refreshToken;
      //     originalRequest.headers = {
      //       ...originalRequest.headers,
      //       authorization: `Bearer ${authToken}`,
      //     };
      //     const key: IKeyAuth = {
      //       authToken,
      //       refreshToken: rfTK,
      //     };
      //     originalRequest.__isRetryRequest = true;
      //     setKeySite(key);
      //     return axiosClient(originalRequest);
      //   })
      //   .catch(() => {
      //     // logoutRequest();
      //   });
      // return store.dispatch(logoutRequest());
    }
    return Promise.reject(((err || {}).response || {}).data);
  },
);

export default axiosClient;
