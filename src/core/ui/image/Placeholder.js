import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#bdbdbd',
    justifyContent: 'center',
  },
});

export const Placeholder = ({height, width, indicatorSlot}) => (
  <View style={{height: height, width: width, ...styles.container}}>
    {indicatorSlot}
    <Ionicons
      name="md-image"
      size={Math.min(height, width) / 2}
      color="white"
    />
  </View>
);
