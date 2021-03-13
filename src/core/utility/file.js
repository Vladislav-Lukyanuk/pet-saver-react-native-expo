import axios from 'axios';

/* Relative import */
import {FILE_URI} from '../data-layer/route';

export const getImageUUID = async (
  imagePickerResult,
  successCallback,
  failCallback,
) => {
  const localUri = imagePickerResult.uri;

  const filename = localUri.split('/').pop();

  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;

  const base64 = imagePickerResult.base64;

  try {
    const imageUUID = await axios.post(FILE_URI, {
      name: filename,
      type: type,
      base64: base64,
    });
    successCallback(imageUUID);
  } catch (error) {
    failCallback();
  }
};

export const getImageBase64 = async (
  imageUUID,
  successCallback,
  failCallback,
) => {
  try {
    const base64 = await axios.get(FILE_URI + '/' + imageUUID);
    successCallback(base64);
  } catch (error) {
    failCallback();
  }
};
