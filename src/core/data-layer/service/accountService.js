import {httpAPIClient} from '../http/httpAPIClient';

const space = httpAPIClient.accountSpace;

export const accountService = {
  userInfo: async () => await space.userInfo(),
  register: async (loginPassword) => await space.register(loginPassword),
  login: async (loginPassword) => await space.login(loginPassword),
  logout: async () => await space.logout(),
  resetPassword: async (loginPassword) =>
    await space.resetPassword(loginPassword),
};
