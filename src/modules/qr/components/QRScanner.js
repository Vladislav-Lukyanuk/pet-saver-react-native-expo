import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BarCodeScanner} from 'expo-barcode-scanner';

/* Relative import */
import {NO_CAMERA_ACCESS} from '../../../textConstant';
import {toastr} from '../../../core/ui-utility/toastr';
import {useLocation} from '../../../core/hook/useLocation';
import {scan} from '../actions';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  barCode: {
    height: '100%',
    width: '100%',
  },
  container: {
    alignSelf: 'center',
    backgroundColor: 'black',
    height: height,
    justifyContent: 'center',
    width: width,
  },
  frame: {
    borderBottomColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomWidth: (height - 250) / 2 + 50,
    borderLeftColor: 'rgba(0, 0, 0, 0.8)',
    borderLeftWidth: (width - 250) / 2,
    borderRightColor: 'rgba(0, 0, 0, 0.8)',
    borderRightWidth: (width - 250) / 2,
    borderTopColor: 'rgba(0, 0, 0, 0.8)',
    borderTopWidth: (height - 250) / 2 - 50,
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
});

export const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const location = useLocation();
  const itemId = useSelector((state) => state.modal.itemId);
  const dispatch = useDispatch();
  const dispatchScan = useCallback(
      (id, lat, lng) => dispatch(scan(id, lat, lng)),
      [dispatch]);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    if (!itemId) {
      dispatchScan(data, location.coords.latitude, location.coords.longitude);
    }
  };

  if (hasPermission === false) {
    toastr.showToast(NO_CAMERA_ACCESS);
    return null;
  }

  return (
    <View style={styles.container}>
      {hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.barCode}
        />
      )}
      <View style={styles.frame} />
    </View>
  );
};
