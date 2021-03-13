import axios from 'axios';

/* Relative import */
import {QR_URI} from '../route';
import {makeGetURI} from '../../utility/qs';

export const qrHttpAPIClient = {
  scan: async (id, lat, lng) => {
    const data = await axios.get(
        makeGetURI(QR_URI + '/' + id, {
          lat: lat,
          lng: lng,
        }),
    );

    return data;
  },
};
