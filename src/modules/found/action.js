import {createAction} from 'redux-actions';

/* Relative import */
import {foundService} from '../../core/data-layer/service/foundService';

export const fetchWithPaginationRequest = createAction(
    '@found/FETCH_WITH_PAGINATION_REQUEST',
);

export const fetchWithPaginationSuccess = createAction(
    '@found/FETCH_WITH_PAGINATION_SUCCESS',
);
export const fetchWithPaginationFail = createAction(
    '@found/FETCH_WITH_PAGINATION_FAIL',
);

export const uploadSuccess = createAction('@found/UPLOAD_SUCCESS');

export const fetchWithPagination = (skip, count) => async (dispatch) => {
  try {
    dispatch(fetchWithPaginationRequest());

    const response = await foundService.fetchWithPagination(skip, count);

    dispatch(fetchWithPaginationSuccess(response));
  } catch (error) {
    dispatch(fetchWithPaginationFail(error));
  }
};
