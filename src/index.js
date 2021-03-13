import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Provider as StateProvider} from 'react-redux';
import {Root} from 'native-base';

/* Relative import */
import {Navigation} from './Navigation';
import {configureStore} from './store';
import {ModalComponent} from './modules/modal/component';

/* Configuration */
import './core/config/axios';

/* Prototype */
import './core/prototype/string';

const store = configureStore();

// TODO: Use a function component
// eslint-disable-next-line require-jsdoc
export default class Setup extends Component {
  // eslint-disable-next-line require-jsdoc
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      isReady: false,
    };
  }
  // eslint-disable-next-line require-jsdoc
  componentDidMount() {
    this._isMounted = true;
    this.loadFonts();
  }

  // eslint-disable-next-line require-jsdoc
  componentWillUnmount() {
    this._isMounted = false;
  }

  // eslint-disable-next-line require-jsdoc
  async loadFonts() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    if (this._isMounted) {
      this.setState({isReady: true});
    }
  }
  // eslint-disable-next-line require-jsdoc
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <StateProvider store={store}>
        <Root>
          <Navigation />
          <ModalComponent />
        </Root>
      </StateProvider>
    );
  }
}
