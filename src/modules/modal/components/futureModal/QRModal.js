import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {compose} from 'recompose';

/* Relative import */
import {CloseButton} from '../../../../core/ui/button/CloseButton';
import {withModal} from '../../../../core/hoc/withModal';
import {getImageBase64} from '../../../../core/utility/file';
import {SEND_QR_TO_MAIL} from '../../../../textConstant';
import {CenteredButton} from '../../../../core/ui/button/CenteredButton';
import {withPrivateProfile} from '../../../../core/hoc/withPrivateProfile';

const {width} = Dimensions.get('window');

const IMAGE_HEIGHT = width * 0.8 - 32;

const styles = StyleSheet.create({
  image: {
    height: IMAGE_HEIGHT,
    width: '100%',
  },
  modalBody: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 0,
    width: '80%',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0, 0, 0.48)',
    flex: 1,
    justifyContent: 'center',
  },
});

export const QrModal = compose(
    withPrivateProfile,
    withModal,
)(({privateProfileItems, itemId, dispatchCloseModal, dispatchSendToMail}) => {
  const item = privateProfileItems.find((i) => i.id === itemId);

  const [imageBase64, setImageBase64] = useState('');

  useEffect(() => {
    if (item.image) {
      const load = async () => {
        await getImageBase64(
            item.qr,
            (imageBase64) => {
              setImageBase64('data:image/jpg;base64,' + imageBase64);
            },
            () => {},
        );
      };
      load();
    }
  }, [item.image]);

  return (
    <Modal
      transparent
      animationType="slide"
      visible
      onRequestClose={() => dispatchCloseModal()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <CloseButton
            onPress={() => {
              dispatchCloseModal();
            }}
            style={{
              top: 16,
              right: 16,
            }}
          />
          <Image source={{uri: imageBase64}} style={styles.image} />
          <CenteredButton
            text={SEND_QR_TO_MAIL}
            onPress={() => dispatchSendToMail(item.id)}
          />
        </View>
      </View>
    </Modal>
  );
});
