import axios from 'axios';

/* Relative import */
import {FOUND_URI} from '../route';
import {makeGetURI} from '../../utility/qs';

export const foundHttpAPIClient = {
  fetchWithPagination: async (skip, count) => {
    const data = await axios.get(
        makeGetURI(FOUND_URI, {
          skip: skip,
          count: count,
        }),
    );

    return data;
  },
  upload: async (obj) => {
    const data = await axios.post(FOUND_URI, obj);

    return data;
  },
};
