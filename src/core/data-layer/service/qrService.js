import {httpAPIClient} from '../http/httpAPIClient';

const space = httpAPIClient.qrSpace;

export const qrService = {
  scan: async (id, lat, lng) =>
    await space.scan(id, lat, lng),
};
