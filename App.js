import React from 'react';
import Expo from 'expo';
import { addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

import AppNavigator from './src/components/AppNavigator';
import reducer from './src/reducers';

// Store configuration
const store = createStore(reducer, devToolsEnhancer());

// Main navigation component
// (App Navigation in components/AppNavigator)
@connect(state => ({
  nav: state.nav,
}))
class AppWithNavigationState extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

export default class App extends React.Component {
  state = { isReady: false };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ isReady: true });
  }
  render() {
    return !this.state.isReady ? (<Expo.AppLoading />) : (
      <Provider store={ store }>
        <StyleProvider style={ getTheme(platform) }>
          <AppWithNavigationState />
        </StyleProvider>
      </Provider>
    );
  }
}
