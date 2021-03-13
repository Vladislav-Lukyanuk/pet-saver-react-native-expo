import {Toast} from 'native-base';

/* Relative import */
import {OK} from '../../textConstant';

export const toastr = {
  showToast: (message, duration = 2500) => {
    Toast.show({
      text: message,
      duration,
      position: 'bottom',
      textStyle: {textAlign: 'center'},
      buttonText: OK,
      type: 'success',
    });
  },
  showWarningToast: (message, duration = 2500) => {
    Toast.show({
      text: message,
      duration,
      position: 'bottom',
      textStyle: {textAlign: 'center'},
      buttonText: OK,
      type: 'warning',
    });
  },
};
