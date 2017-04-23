import React from 'react';
import { AsyncStorage } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import composeWithDevTools from 'remote-redux-devtools';

import AppNavigator from './src/components/AppNavigator';
import reducer from './src/reducers';

// Store configuration
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
));

// Get favorites from AsyncStorage:
AsyncStorage.getItem('favorites')
  .then((results, err) => {
    if (err) {
      throw err;
    }
    console.log('results from initialize', results);
    if (results) {
      store.dispatch({
        type: 'favorites/INITIALIZE',
        payload: JSON.parse(results),
      });
    }
  });


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
