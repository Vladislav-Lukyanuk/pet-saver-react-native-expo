import {handleActions} from 'redux-actions';
import {
  fetchWithPaginationRequest,
  fetchWithPaginationSuccess,
  fetchWithPaginationFail,
  uploadSuccess, uploadOrUpdateByQRData,
} from './action';

const initialState = {
  lostItems: [],
  isLoading: false,
  error: null,
};

export const lostReducer = handleActions(
    {
      [fetchWithPaginationRequest]: (state) => ({
        ...state,
        isLoading: true,
      }),
      [fetchWithPaginationSuccess]: (state, {payload}) => ({
        ...state,
        lostItems: [...state.lostItems, ...payload],
        isLoading: false,
      }),
      [fetchWithPaginationFail]: (state, {payload}) => ({
        ...state,
        isLoading: false,
      }),
      [uploadSuccess]: (state, {payload}) => ({
        ...state,
        lostItems: [payload, ...state.lostItems],
      }),
      [uploadOrUpdateByQRData]: (state, {payload}) => {
        const animalArrayIndex =
            state.lostItems.findIndex((a) => a.id === payload.id);

        if (animalArrayIndex !== -1) {
          const animals = [...state.lostItems];

          animals.splice(animalArrayIndex, 1, payload);

          return ({
            ...state,
            lostItems: animals,
          });
        }

        return ({
          ...state,
          lostItems: [payload, ...state.lostItems],
        });
      },
    },
    initialState,
);
