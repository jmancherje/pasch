import React from 'react';
import Expo from 'expo';
import { addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';

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
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
