import React from 'react';
import {StatusBar} from 'react-native';
import Setup from './src';

// eslint-disable-next-line require-jsdoc
export default class App extends React.Component {
  // eslint-disable-next-line require-jsdoc
  render() {
    return (
      <>
        <StatusBar />
        <Setup />
      </>
    );
  }
}
