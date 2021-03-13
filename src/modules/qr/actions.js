/*
* Relative import
* */
import {qrService} from '../../core/data-layer/service/qrService';
import {toastr} from '../../core/ui-utility/toastr';
import {openViewModal} from '../modal/action';
import {ScreenType} from '../../type';
import {SERVER_IS_NOT_RESPONDING} from '../../textConstant';
import {uploadOrUpdateByQRData} from '../lost/action';

export const scan = (id, lat, lng) => async (dispatch) => {
  try {
    const response = await qrService.scan(id, lat, lng);

    dispatch(uploadOrUpdateByQRData(response));
    dispatch(openViewModal({type: ScreenType.lostScreen, id: response.id}));
  } catch (error) {
    if (error === null) {
      toastr.showWarningToast(SERVER_IS_NOT_RESPONDING);
    } else {
      toastr.showWarningToast(error.message);
    }
  }
};
