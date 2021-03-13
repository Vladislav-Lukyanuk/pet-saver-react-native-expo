import axios from 'axios';
import {set} from 'lodash-es';

/*
* Relative import
* */
import {getData, storeData} from '../utility/localStore';
import {AUTH_RELEASE_NEW_TOKENS_URI} from '../data-layer/route';

axios.interceptors.response.use((response) => response.data, async (error) => {
  if (error.config && error.response && error.response.status === 401) {
    const refreshToken = await getData('refreshToken');
    if (refreshToken) {
      error.config.headers.Authorization = `Bearer ${refreshToken}`;

      return axios.get(AUTH_RELEASE_NEW_TOKENS_URI, error.config)
          .then(async (tokens) => {
            await storeData('accessToken', tokens.accessToken);
            await storeData('refreshToken', tokens.refreshToken);
            error.config.headers['Authorization'] =
                    'Bearer ' + tokens.accessToken;

            return axios.request(error.config);
          });
    }
  }

  return Promise.reject(error.response ? error.response.data : null);
});

axios.interceptors.request.use(
    async (config) => {
      const accessToken = await getData('accessToken');

      if (
        accessToken &&
      !config.headers.Authorization &&
      !config.headers.authorization
      ) {
        set(config, 'headers.Authorization', `Bearer ${accessToken}`);
      }

      return config;
    },
    (error) => Promise.reject(error),
);
