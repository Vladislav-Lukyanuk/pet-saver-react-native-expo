import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import {Container, Content, Text} from 'native-base';
import {compose} from 'recompose';
import MapView, {Marker} from 'react-native-maps';

/* Relative import */
import {Placeholder} from '../../../core/ui/image/Placeholder';
import {CloseButton} from '../../../core/ui/button/CloseButton';
import {Hr} from '../../../core/ui/devider/Hr';
import {withModal} from '../../../core/hoc/withModal';
import {withLost} from '../../../core/hoc/withLost';
import {withFound} from '../../../core/hoc/withFound';
import {START, POINT} from '../../../textConstant';
import {getImageBase64} from '../../../core/utility/file';

const {width} = Dimensions.get('window');

const IMAGE_HEIGHT = 250;

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    right: 25,
    top: 15,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
    width: '100%',
  },
  image: {
    height: IMAGE_HEIGHT,
    width: width,
  },
  infoContainer: {
    alignSelf: 'center',
    marginVertical: 15,
    width: '90%',
  },
  map: {
    alignSelf: 'center',
    height: 300,
    marginBottom: 15,
    marginTop: 25,
    width: '95%',
  },
  scrollContainer: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 28,
    width: '100%',
  },
});

export const ViewModal = compose(
    withLost,
    withFound,
    withModal,
)(({lostItems, foundItems, modalType, itemId, dispatchCloseModal}) => {
  const dataArray = modalType ? foundItems : lostItems;
  const item = dataArray.find((i) => i.id === itemId);

  const [imageBase64, setImageBase64] = useState('');

  useEffect(() => {
    if (item.image) {
      const load = async () => {
        await getImageBase64(
            item.image,
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
    <Modal transparent animationType="slide" visible onRequestClose={() => {}}>
      <Container>
        <Content>
          <CloseButton
            onPress={() => {
              dispatchCloseModal();
            }}
          />
          <ScrollView style={styles.scrollContainer}>
            {(Boolean(imageBase64) && (
              <Image source={{uri: imageBase64}} style={styles.image} />
            )) || <Placeholder height={IMAGE_HEIGHT} width={width} />}
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Hr />
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <MapView
              initialRegion={{
                latitude: item.coordinates[0].latitude,
                longitude: item.coordinates[0].longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.map}
            >
              {item.coordinates.map((coordinate, index) => (
                <Marker
                  coordinate={coordinate}
                  title=" "
                  description={!index ? START : `${POINT} ${index + 1}`}
                  pinColor={!index ? 'wheat' : 'red'}
                  key={`marker_${index}_${Math.random()}`}
                />
              ))}
            </MapView>
          </ScrollView>
        </Content>
      </Container>
    </Modal>
  );
});
