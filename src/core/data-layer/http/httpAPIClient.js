import {lostHttpAPIClient} from './lostHttpAPIClient';
import {foundHttpAPIClient} from './foundHttpAPIClient';
import {accountHttpAPIClient} from './accountHttpAPIClient';
import {privateProfileHttpAPIClient} from './privateProfileHttpAPIClient';
import {qrHttpAPIClient} from './qrHttpAPIClient';

export const httpAPIClient = {
  lostSpace: lostHttpAPIClient,
  foundSpace: foundHttpAPIClient,
  accountSpace: accountHttpAPIClient,
  privatePrfileSpace: privateProfileHttpAPIClient,
  qrSpace: qrHttpAPIClient,
};
