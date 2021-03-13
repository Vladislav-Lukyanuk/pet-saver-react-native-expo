import axios from 'axios';

/* Relative import */
import {LOST_URI} from '../route';
import {makeGetURI} from '../../utility/qs';

export const lostHttpAPIClient = {
  fetchWithPagination: async (skip, count) => {
    const data = await axios.get(
        makeGetURI(LOST_URI, {
          skip: skip,
          count: count,
        }),
    );

    return data;
  },
  upload: async (obj) => {
    const data = await axios.post(LOST_URI, obj);

    return data;
  },
};
