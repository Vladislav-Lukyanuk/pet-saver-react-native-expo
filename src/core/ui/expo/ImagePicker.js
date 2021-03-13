import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'native-base';
import * as EImagePicker from 'expo-image-picker';

/* Relative import */
import {getImageUUID, getImageBase64} from '../../utility/file';
import {ActivityIndicator} from '../loader/ActivityIndicator';
import {Placeholder} from '../image/Placeholder';

const {width} = Dimensions.get('window');

const pickImage = async (setImage, setLoading) => {
  const result = await EImagePicker.launchImageLibraryAsync({
    mediaTypes: EImagePicker.MediaTypeOptions.Images,
    base64: true,
    aspect: [4, 3],
  });

  if (!result.cancelled) {
    setLoading(true);
    await getImageUUID(
        result,
        (imageUUID) => {
          setImage(imageUUID);
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
    );
  }
};

const IMAGE_HEIGHT = 250;

const styles = StyleSheet.create({
  activityIndicator: {
    left: width / 2 - 24,
    position: 'absolute',
    top: IMAGE_HEIGHT / 2 - 24,
    zIndex: 1,
  },
  button: {
    height: IMAGE_HEIGHT,
    width: width,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: IMAGE_HEIGHT,
    width: width,
  },
});

export const ImagePicker = ({imageUri, setImage}) => {
  const [isLoading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState('');

  useEffect(() => {
    if (imageUri) {
      const load = async () => {
        await getImageBase64(
            imageUri,
            (imageBase64) => {
              setImageBase64('data:image/jpg;base64,' + imageBase64);
            },
            () => {},
        );
      };
      load();
    }
  }, [imageUri]);

  return (
    <View style={styles.container}>
      {(imageUri && (
        <Button
          onPress={() => {
            pickImage(setImage, setLoading);
          }}
          style={styles.button}
        >
          <ActivityIndicator
            isLoading={isLoading}
            size={48}
            style={styles.activityIndicator}
          />
          <Image source={{uri: imageBase64}} style={styles.image} />
        </Button>
      )) || (
        <Button
          onPress={() => {
            pickImage(setImage, setLoading);
          }}
          style={styles.button}
        >
          <Placeholder
            height={IMAGE_HEIGHT}
            width={width}
            indicatorSlot={
              <ActivityIndicator
                isLoading={isLoading}
                size={48}
                style={styles.activityIndicator}
              />
            }
          />
        </Button>
      )}
    </View>
  );
};
