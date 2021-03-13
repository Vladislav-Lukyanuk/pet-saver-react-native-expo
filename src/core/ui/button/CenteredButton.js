import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Item, Text} from 'native-base';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 25,
  },
  buttonContainer: {
    borderColor: 'white',
    justifyContent: 'center',
    marginVertical: 16,
  },
});

export const CenteredButton = ({text, onPress}) => (
  <Item style={styles.buttonContainer}>
    <Button style={styles.button} onPress={onPress}>
      <Text>{text}</Text>
    </Button>
  </Item>
);
