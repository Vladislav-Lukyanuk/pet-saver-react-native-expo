import {createAction} from 'redux-actions';

/* Relative import */
import {toastr} from '../../core/ui-utility/toastr';
import {
  privateProfileService,
} from '../../core/data-layer/service/privateProfileService';
import {closeModal} from '../modal/action';
import {
  CODE_WAS_SENT_TO_MAIL,
  SERVER_IS_NOT_RESPONDING
} from '../../textConstant';

export const fetchWithPaginationRequest = createAction(
    '@privateProfile/FETCH_WITH_PAGINATION_REQUEST',
);
export const fetchWithPaginationSuccess = createAction(
    '@privateProfile/FETCH_WITH_PAGINATION_SUCCESS',
);
export const fetchWithPaginationFail = createAction(
    '@privateProfile/FETCH_WITH_PAGINATION_FAIL',
);

export const fetchnRequest = createAction('@privateProfile/FETCH_REQUEST');
export const fetchSuccess = createAction('@privateProfile/FETCH_SUCCESS');
export const fetchFail = createAction('@privateProfile/FETCH_FAIL');

export const uploadRequest = createAction('@privateProfile/UPLOAD_REQUEST');
export const uploadSuccess = createAction('@privateProfile/UPLOAD_SUCCESS');
export const uploadFail = createAction('@privateProfile/UPLOAD_FAIL');

export const updateRequest = createAction('@privateProfile/UPDATE_REQUEST');
export const updateSuccess = createAction('@privateProfile/UPDATE_SUCCESS');
export const updateFail = createAction('@privateProfile/UPDATE_FAIL');

export const removeRequest = createAction('@privateProfile/REMOVE_REQUEST');
export const removeSuccess = createAction('@privateProfile/REMOVE_SUCCESS');
export const removeFail = createAction('@privateProfile/REMOVE_FAIL');

export const markedAsRequest =
    createAction('@privateProfile/MARKED_AS_REQUEST');
export const markedAsSuccess =
    createAction('@privateProfile/MARKED_AS_SUCCESS');
export const markedAsFail = createAction('@privateProfile/MARKED_AS_FAIL');

export const fetchWithPagination = (skip, count) => async (dispatch) => {
  try {
    dispatch(fetchWithPaginationRequest());

    const response = await privateProfileService.fetchWithPagination(
        skip,
        count,
    );

    dispatch(fetchWithPaginationSuccess(response));
  } catch (error) {
    if (error === null) {
      toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
    }

    dispatch(fetchWithPaginationFail());
  }
};

export const upload = (obj) => async (dispatch) => {
  try {
    dispatch(updateRequest());

    const response = await privateProfileService.upload(obj);

    dispatch(uploadSuccess(response));
    dispatch(closeModal());
    return;
  } catch (error) {
    if (error === null) {
      toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
    } else {
      toastr.showWarningToast(error);
    }
    dispatch(uploadFail());
  }
};

export const update = (id, obj) => async (dispatch) => {
  try {
    dispatch(updateRequest());

    const response = await privateProfileService.update(id, obj);

    dispatch(updateSuccess(response));
    return;
  } catch (error) {
    if (error === null) {
      toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
    } else {
      toastr.showWarningToast(error);
    }
    dispatch(updateFail());
  }
};

export const remove = (id) => async (dispatch) => {
  try {
    dispatch(removeRequest());

    const response = await privateProfileService.remove(id);

    dispatch(removeSuccess(response));
    return;
  } catch (error) {
    if (error === null) {
      toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
    } else {
      toastr.showWarningToast(error);
    }
    dispatch(removeFail());
  }
};

export const markAs = (id, type, title, description, lat, lng) => async (
  dispatch,
) => {
  try {
    dispatch(markedAsRequest());

    const response = await privateProfileService.markAs(
        id,
        type,
        title,
        description,
        lat,
        lng,
    );

    dispatch(markedAsSuccess(response));
    return;
  } catch (error) {
    if (error === null) {
      toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
    } else {
      toastr.showWarningToast(error);
    }
    dispatch(markedAsFail());
  }
};

export const sendToMail = (id) => async (dispatch) => {
  try {
    await privateProfileService.sendToMail(id);
    dispatch(closeModal());
    toastr.showToast(CODE_WAS_SENT_TO_MAIL);
  } catch (error) {
    if (error === null) {
      toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
    } else {
      toastr.showWarningToast(error);
    }
  }
};
