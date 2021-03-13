import React from 'react';
import {Text} from 'native-base';

export const Error = ({children, style}) => (
  <Text style={{color: 'red', ...style}}>{children}</Text>
);
