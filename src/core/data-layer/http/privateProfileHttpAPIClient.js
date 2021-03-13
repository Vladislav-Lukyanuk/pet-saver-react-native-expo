import axios from 'axios';
import {omitBy, isNil} from 'lodash-es';

/* Relative import */
import {
  PRIVATE_PROFILE_URI,
  PRIVATE_PROFILE_MARK_AS_URI,
  PRIVATE_PROFILE_SEND_TO_MAIL_URI,
} from '../route';
import {makeGetURI} from '../../utility/qs';

export const privateProfileHttpAPIClient = {
  fetchWithPagination: async (skip, count) => {
    const data = await axios.get(
        makeGetURI(PRIVATE_PROFILE_URI, {
          skip: skip,
          count: count,
        }),
    );

    return data;
  },
  upload: async (obj) => {
    const data = await axios.post(PRIVATE_PROFILE_URI, obj);

    return data;
  },
  update: async (id, obj) => {
    const data = await axios.put(PRIVATE_PROFILE_URI + '/' + id, obj);

    return data;
  },
  remove: async (id) => {
    const resId = await axios.delete(PRIVATE_PROFILE_URI + '/' + id);

    return resId;
  },
  markAs: async (id, type, title, description, lat, lng) => {
    const query = {
      type,
      title,
      description,
      lat,
      lng,
    };

    const data = await axios.get(
        makeGetURI(
            PRIVATE_PROFILE_MARK_AS_URI + '/' + id,
            omitBy(query, isNil),
        ),
    );

    return data;
  },
  sendToMail: async (id) => {
    await axios.get(PRIVATE_PROFILE_SEND_TO_MAIL_URI + '/' + id);
  },
};
