import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button} from 'native-base';

const styles = StyleSheet.create({
  buttonText: {
    color: 'green',
  },
});

export const TransparentButton = ({text, onPress}) => (
  <Button transparent onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </Button>
);
