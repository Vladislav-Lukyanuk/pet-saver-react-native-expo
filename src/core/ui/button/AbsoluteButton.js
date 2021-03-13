import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';
import {Ionicons} from '@expo/vector-icons';

const styles = StyleSheet.create({
  button: {
    bottom: 40,
    paddingHorizontal: 15,
    position: 'absolute',
    right: 30,
  },
});

export const AbsoluteButton = ({onPress, color, icon}) => (
  <Button
    rounded
    style={{backgroundColor: color, ...styles.button}}
    onPress={onPress}
  >
    <Ionicons name={icon} size={24} color="white" />
  </Button>
);
