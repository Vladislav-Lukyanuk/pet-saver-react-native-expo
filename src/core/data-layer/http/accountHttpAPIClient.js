import axios from 'axios';

/* Relative import */
import {
  AUTH_URI,
  AUTH_LOGIN_URI,
  AUTH_LOGOUT_URI,
  AUTH_REGISTER_URI,
  AUTH_RESET_PASSWORD_URI,
} from '../route';

export const accountHttpAPIClient = {
  userInfo: async () => {
    const data = await axios.get(AUTH_URI);

    return data;
  },
  login: async (loginPassword) => {
    const data = await axios.post(AUTH_LOGIN_URI, loginPassword);

    return data;
  },
  logout: async () => {
    const data = await axios.get(AUTH_LOGOUT_URI);

    return data;
  },
  register: async (loginPassword) => {
    const data = await axios.post(AUTH_REGISTER_URI, loginPassword);

    return data;
  },
  resetPassword: async (loginPassword) => {
    const data = await axios.post(AUTH_RESET_PASSWORD_URI, loginPassword);

    return data;
  },
};
