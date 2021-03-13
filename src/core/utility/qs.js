import {stringify} from 'qs';

export const makeGetURI = (relativePath, obj) =>
  relativePath + '?' + stringify(obj);
