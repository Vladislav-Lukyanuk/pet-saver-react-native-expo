import {createAction} from 'redux-actions';

/* Relative import */
import {toastr} from '../../core/ui-utility/toastr';
import {accountService} from '../../core/data-layer/service/accountService';
import {storeData, removeData} from '../../core/utility/localStore';
import {fetchWithPagination} from '../privateProfile/action';
import {PAGE_SIZE} from '../../constant';
import {
  CONFIRMATION_EMAIL_WAS_SENT,
  RESET_PASSWORD_EMAIL_WAS_SENT,
  SERVER_IS_NOT_RESPONDING,
} from '../../textConstant';

export const userInfoRequest = createAction('@account/USER_INFO_REQUEST');
export const userInfoSuccess = createAction('@account/USER_INFO_SUCCESS');
export const userInfoFail = createAction('@account/USER_INFO_FAIL');

export const loginRequest = createAction('@account/LOGIN_REQUEST');
export const loginSuccess = createAction('@account/LOGIN_SUCCESS');
export const loginFail = createAction('@account/LOGIN_FAIL');

export const registerRequest = createAction('@account/REGISTER_REQUEST');
export const registerSuccess = createAction('@account/REGISTER_SUCCESS');
export const registerFail = createAction('@account/REGISTER_FAIL');

export const logoutRequest = createAction('@account/LOGOUT_REQUEST');
export const logoutSuccess = createAction('@account/LOGOUT_SUCCESS');
export const logoutFail = createAction('@account/LOGOUT_FAIL');

export const forgotPasswordRequest = createAction(
    '@account/FORGOT_PASSWORD_REQUEST',
);
export const forgotPasswordSuccess = createAction(
    '@account/FORGOT_PASSWORD_SUCCESS',
);
export const forgotPasswordFail = createAction('@account/FORGOT_PASSWORD_FAIL');

export const userInfo = () => {
  return async (dispatch) => {
    try {
      dispatch(userInfoRequest());

      const response = await accountService.userInfo();

      dispatch(userInfoSuccess(response));
    } catch (error) {
      if (error === null) {
        toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
      }

      dispatch(userInfoFail());
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());

      await accountService.logout();

      await removeData('accessToken');
      await removeData('refreshToken');

      dispatch(logoutSuccess());
    } catch (error) {
      if (error === null) {
        toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
      } else {
        toastr.showWarningToast(error.message);
      }

      dispatch(logoutFail());
    }
  };
};

export const resetPassword = (login, password) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordRequest());

      const response = await accountService.resetPassword({
        login,
        password,
      });

      dispatch(forgotPasswordSuccess(response));
      toastr.showToast(RESET_PASSWORD_EMAIL_WAS_SENT);
    } catch (error) {
      if (error === null) {
        toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
      } else {
        toastr.showWarningToast(error.message);
      }

      dispatch(forgotPasswordFail());
    }
  };
};

export const login = (login, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());

      const response = await accountService.login({login, password});

      await storeData('accessToken', response.tokens.accessToken);
      await storeData('refreshToken', response.tokens.refreshToken);

      dispatch(loginSuccess(response));
      dispatch(fetchWithPagination(0, PAGE_SIZE));
    } catch (error) {
      if (error === null) {
        toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
      } else {
        toastr.showWarningToast(error.message);
      }
      dispatch(loginFail());
    }
  };
};

export const register = (login, password) => {
  return async (dispatch) => {
    try {
      dispatch(registerRequest());

      const response = await accountService.register({login, password});

      dispatch(registerSuccess(response));

      toastr.showToast(CONFIRMATION_EMAIL_WAS_SENT);
    } catch (error) {
      if (error === null) {
        toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
      } else {
        toastr.showWarningToast(error.message);
      }
      dispatch(registerFail());
    }
  };
};
