import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  hr: {
    borderColor: '#616161',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
  },
});

export const Hr = () => <View style={styles.hr} />;
