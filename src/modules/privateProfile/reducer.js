import {handleActions} from 'redux-actions';

/* Relative import */
import {
  fetchWithPaginationFail,
  fetchWithPaginationRequest,
  fetchWithPaginationSuccess,
  markedAsSuccess,
  uploadRequest,
  uploadSuccess,
  uploadFail,
  removeSuccess,
} from './action';
import {logoutSuccess} from '../account/action';

const initialState = {
  animals: [],
  openedId: null,
  isLoading: false,
};

export const privateProfileReducer = handleActions(
    {
      [fetchWithPaginationRequest]: (state) => ({
        ...state,
        isLoading: true,
      }),
      [fetchWithPaginationSuccess]: (state, {payload}) => ({
        ...state,
        animals: [...state.animals, ...payload],
        isLoading: false,
      }),
      [fetchWithPaginationFail]: (state) => ({
        ...state,
        isLoading: false,
      }),
      [logoutSuccess]: (state) => ({
        ...state,
        animals: [],
      }),
      [uploadRequest]: (state) => ({
        ...state,
        isLoading: true,
      }),
      [uploadSuccess]: (state, {payload}) => ({
        ...state,
        animals: [...state.animals, payload],
        isLoading: false,
      }),
      [uploadFail]: (state) => ({
        ...state,
        isLoading: false,
      }),
      [markedAsSuccess]: (state, {payload}) => {
        const animals = [...state.animals];
        const index = animals.findIndex((a) => a.id === payload.id);
        if (index === -1) {
          return state;
        }
        animals.splice(index, 1, payload);
        return ({
          ...state,
          animals: [...animals],
          isLoading: false,
        });
      },
      [removeSuccess]: (state, {payload}) => {
        const animals = [...state.animals];
        const index = animals.findIndex((a) => a.id === payload);
        if (index === -1) {
          return state;
        }
        animals.splice(index, 1);
        return ({
          ...state,
          animals: [...animals],
          isLoading: false,
        });
      },
    },
    initialState,
);
