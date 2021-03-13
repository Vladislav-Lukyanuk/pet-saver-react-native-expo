import {handleActions} from 'redux-actions';
import {uploadStart, uploadFinish, uploadFail} from './action';

const initialState = {
  isLoading: false,
  error: null,
};

export const addReducer = handleActions(
    {
      [uploadStart]: (state) => ({
        ...state,
        isLoading: true,
      }),
      [uploadFinish]: (state) => ({
        ...state,
        isLoading: false,
      }),
      [uploadFail]: (state, {payload}) => ({
        ...state,
        error: payload,
      }),
    },
    initialState,
);
