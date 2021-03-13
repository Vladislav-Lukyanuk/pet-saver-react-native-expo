import React from 'react';
import {Container, Content} from 'native-base';

import {QRScanner} from './components/QRScanner';

export const QRComponent = () => (
  <Container>
    <QRScanner />
  </Container>
);
