import {createAction} from 'redux-actions';

/* Relative import */
import {lostService} from '../../core/data-layer/service/lostService';

export const fetchWithPaginationRequest = createAction(
    '@lost/FETCH_WITH_PAGINATION_REQUEST',
);
export const fetchWithPaginationSuccess = createAction(
    '@lost/FETCH_WITH_PAGINATION_SUCCESS',
);
export const fetchWithPaginationFail = createAction(
    '@lost/FETCH_WITH_PAGINATION_FAIL',
);

export const uploadSuccess = createAction('@lost/UPLOAD_SUCCESS');

export const uploadOrUpdateByQRData =
    createAction('@lost/UPLOAD_OR_UPDATE_BY_QR_DATA');

export const fetchWithPagination = (skip, count) => async (dispatch) => {
  try {
    dispatch(fetchWithPaginationRequest());

    const response = await lostService.fetchWithPagination(skip, count);

    dispatch(fetchWithPaginationSuccess(response));
  } catch (error) {
    dispatch(fetchWithPaginationFail(error));
  }
};
