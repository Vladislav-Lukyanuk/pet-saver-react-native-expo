import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const Flex = ({children, style}) => (
  <View style={{...styles.container, ...style}}>{children}</View>
);
