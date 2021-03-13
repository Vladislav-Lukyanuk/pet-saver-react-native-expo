import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'gray',
  },
});

export const Placeholder = ({title}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title.capitalize()}</Text>
  </View>
);
