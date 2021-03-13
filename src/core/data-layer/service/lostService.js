import {httpAPIClient} from '../http/httpAPIClient';

const space = httpAPIClient.lostSpace;

export const lostService = {
  fetchWithPagination: async (skip, count) =>
    await space.fetchWithPagination(skip, count),
  upload: async (obj) => await space.upload(obj),
};
