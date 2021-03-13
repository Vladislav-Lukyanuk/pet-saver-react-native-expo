import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';
import {Ionicons} from '@expo/vector-icons';

const styles = StyleSheet.create({
  close: {
    backgroundColor: 'green',
    paddingHorizontal: 15,
    position: 'absolute',
    right: 25,
    top: 15,
    zIndex: 1,
  },
});

export const CloseButton = ({onPress, style}) => (
  <Button onPress={onPress} style={{...styles.close, ...style}}>
    <Ionicons name="md-close" size={24} color="white" />
  </Button>
);
