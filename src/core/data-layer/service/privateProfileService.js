import {httpAPIClient} from '../http/httpAPIClient';

const space = httpAPIClient.privatePrfileSpace;

export const privateProfileService = {
  fetchWithPagination: async (skip, count) =>
    await space.fetchWithPagination(skip, count),
  upload: async (obj) => await space.upload(obj),
  update: async (id, obj) => await space.update(id, obj),
  remove: async (id) => await space.remove(id),
  markAs: async (id, type, title, description, lat, lng) =>
    await space.markAs(id, type, title, description, lat, lng),
  sendToMail: async (id) => await space.sendToMail(id),
};
