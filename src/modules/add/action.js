import {createAction} from 'redux-actions';

/* Relative import */
import {lostService} from '../../core/data-layer/service/lostService';
import {
  privateProfileService,
} from '../../core/data-layer/service/privateProfileService';
import {foundService} from '../../core/data-layer/service/foundService';
import {ScreenType} from '../../type';
import {uploadSuccess as lostUploadSuccess} from '../../modules/lost/action';
import {uploadSuccess as foundUploadSuccess} from '../../modules/found/action';
import {
  markedAsSuccess,
} from '../../modules/privateProfile/action';

import {closeModal} from '../../modules/modal/action';

export const uploadStart = createAction('@add/UPLOAD_START');
export const uploadFinish = createAction('@add/UPLOAD_FINISH');
export const uploadFail = createAction('@add/UPLOAD_FAIL');

export const upload = (modalType, obj) => async (dispatch) => {
  try {
    dispatch(uploadStart());

    let response = null;

    /* mark as scope */
    if (modalType === ScreenType.markAsScreen) {
      response = await privateProfileService.markAs(
          obj.id,
          ScreenType.lostScreen,
          obj.title,
          obj.description,
          obj.coordinates[0].latitude,
          obj.coordinates[0].longitude,
      );
      dispatch(lostUploadSuccess(response.animal));
      dispatch(markedAsSuccess(response));
      dispatch(uploadFinish());
      dispatch(closeModal());
      return;
    }
    /* */

    if (modalType === ScreenType.lostScreen) {
      response = await lostService.upload(obj);
      dispatch(lostUploadSuccess(response));
      dispatch(uploadFinish());
      dispatch(closeModal());
      return;
    }

    response = await foundService.upload(obj);
    dispatch(foundUploadSuccess(response));
    dispatch(uploadFinish());
    dispatch(closeModal());
  } catch (error) {
    dispatch(uploadFail(error));
  }
};
