import {handleActions} from 'redux-actions';
import {
  fetchWithPaginationRequest,
  fetchWithPaginationSuccess,
  fetchWithPaginationFail,
  uploadSuccess,
} from './action';

const initialState = {
  foundItems: [],
  isLoading: false,
  error: null,
};

export const foundReducer = handleActions(
    {
      [fetchWithPaginationRequest]: (state) => ({
        ...state,
        isLoading: true,
      }),
      [fetchWithPaginationSuccess]: (state, {payload}) => ({
        ...state,
        foundItems: [...state.foundItems, ...payload],
        isLoading: false,
      }),
      [fetchWithPaginationFail]: (state, {payload}) => ({
        ...state,
        error: payload,
        isLoading: false,
      }),
      [uploadSuccess]: (state, {payload}) => ({
        ...state,
        foundItems: [payload, ...state.foundItems],
      }),
    },
    initialState,
);
