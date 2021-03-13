import {handleActions} from 'redux-actions';
import {
  userInfoRequest,
  userInfoSuccess,
  userInfoFail,
  loginRequest,
  loginSuccess,
  loginFail,
  registerRequest,
  registerSuccess,
  registerFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
} from './action';

const initialState = {
  isLoading: false,
  isAuthorizated: false,
  userId: null,
};

export const accountReducer = handleActions(
    {
      [userInfoRequest]: (state) => ({
        ...state,
        isLoading: true,
      }),
      [userInfoSuccess]: (state, {payload}) => ({
        ...state,
        isAuthorizated: true,
        userId: payload.userId,
        isLoading: false,
      }),
      [userInfoFail]: (state) => ({
        ...state,
        isLoading: false,
      }),
      [loginRequest]: (state) => ({
        ...state,
        isLoading: true,
      }),
      [loginSuccess]: (state, {payload}) => ({
        ...state,
        isAuthorizated: true,
        userId: payload.userId,
        isLoading: false,
      }),
      [loginFail]: (state) => ({
        ...state,
        isLoading: false,
      }),
      [registerRequest]: (state) => ({
        ...state,
        isLoading: true,
      }),
      [registerSuccess]: (state) => ({
        ...state,
        isLoading: false,
      }),
      [registerFail]: (state) => ({
        ...state,
        isLoading: false,
      }),
      [logoutRequest]: (state) => ({
        ...state,
        isLoading: true,
      }),
      [logoutSuccess]: (state) => ({
        ...state,
        userId: null,
        isAuthorizated: false,
        isLoading: false,
      }),
      [logoutFail]: (state) => ({
        ...state,
        isLoading: false,
      }),
      [forgotPasswordRequest]: (state) => ({
        ...state,
        isLoading: true,
      }),
      [forgotPasswordSuccess]: (state) => ({
        ...state,
        isLoading: false,
      }),
      [forgotPasswordFail]: (state) => ({
        ...state,
        isLoading: false,
      }),
    },
    initialState,
);
