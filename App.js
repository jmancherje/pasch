import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
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
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
