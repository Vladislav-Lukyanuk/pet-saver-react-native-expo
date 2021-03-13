import {httpAPIClient} from '../http/httpAPIClient';

const space = httpAPIClient.foundSpace;

export const foundService = {
  fetchWithPagination: async (skip, count) =>
    await space.fetchWithPagination(skip, count),
  upload: async (obj) => await space.upload(obj),
};
