import React from 'react';
import {Container} from 'native-base';

/* Relative import */
import {Placeholder} from './components/Placeholder';
import {Content} from './components/Content';
import {AccountInfo} from './components/AccountInfo';
import {Footer} from './components/Footer';

export const PrivateProfile = ({privateProfileItems, isLoading}) => (
  <Container>
    <AccountInfo />
    <Content/>
    <Placeholder />
    <Footer />
  </Container>);
