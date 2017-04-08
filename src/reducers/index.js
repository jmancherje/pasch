import { combineReducers } from 'redux';
import AppNavigator from '../components/AppNavigator';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState ? newState : state;
};

const defaultFilter = 'state';
const filters = (state = defaultFilter, { type, payload }) => {
  switch (type) {
    case 'filters/RESET':
      return defaultFilter;
    case 'filters/SET':
      return payload;
    default:
      return state;
  }
};

const selection = (state = {}, { type, payload }) => {
  switch (type) {
    case 'selection/SET':
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  nav: navReducer,
  filters,
  selection,
});
