import React from 'react';
import {Linking} from 'react-native';
import {Text} from 'native-base';

export const Link = ({children, url, style}) => (
  <Text style={{color: 'green', ...style}} onPress={() => {
    Linking.openURL(url);
  }}>{children}</Text>
);
