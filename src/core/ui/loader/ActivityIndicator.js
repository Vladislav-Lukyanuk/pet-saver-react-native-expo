import React from 'react';
import {ActivityIndicator as RNActivityIndicator} from 'react-native';
import {When} from '../../ui-utility/When';

export const ActivityIndicator = ({isLoading, size, style}) => (
  <When condition={isLoading}>
    <RNActivityIndicator size={size} color="#388e3c" style={style} />
  </When>
);
