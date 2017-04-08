import { combineReducers } from 'redux';
import AppNavigator from '../components/AppNavigator';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState ? newState : state;
}

export const combineReducers({
  nav: navReducer
})