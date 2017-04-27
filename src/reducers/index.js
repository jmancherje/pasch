// @flow
import { combineReducers } from 'redux';

import AppNavigator from '../components/AppNavigator';

import realData from '../constants/realData.json';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState ? newState : state;
};

const defaultFilters = [];
const filters = (state = defaultFilters, { type, payload }) => {
  let filterList = [...state];
  let filterIndex;
  switch (type) {
    case 'filters/RESET':
      return [...defaultFilters];
    case 'filters/SET':
      return [payload];
    case 'filters/ADD':
      filterIndex = filterList.findIndex(filter => filter.property === payload.property);
      if (filterIndex > -1) {
        // Modify existing
        filterList[filterIndex] = payload;
        return filterList;
      }
      return [...state, payload];
    case 'filters/REMOVE':
      // Payload is index of filter to remove
      return state.filter((_, index) => index !== payload);
    default:
      return state;
  }
};

// Figure out why sorting by name in reverse fixes this
const defaultSorters = [{
  property: 'state',
  functionType: 'default',
}, {
  property: 'name',
  functionType: 'reverse',
}];
const sorters = (state = defaultSorters, { type, payload }) => {
  switch (type) {
    case 'sorters/RESET':
      return [...defaultSorters];
    case 'sorters/ADD':
      return [...state, payload];
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

const favorites = (state = {}, { type, payload }) => {
  switch (type) {
    case 'favorites/SET':
      return { ...state, [payload.name]: true };
    case 'favorite/REMOVE':
      return { ...state, [payload.name]: false };
    case 'favorite/TOGGLE':
      return { ...state, [payload.name]: !state[payload.name] };
    case 'favorite/INITIALIZE':
      console.log('initialize', payload);
      return { ...state, ...payload };
    default:
      return state;
  }
};

const isShowingFavorites = (state = false, { type }) => {
  switch (type) {
    case 'showFavorites/ON':
      return true;
    case 'showFavorites/OFF':
      return false;
    default:
      return state;
  }
};

const schools = (state = realData, { type, payload }) => {
  return state;
};

export default combineReducers({
  nav: navReducer,
  sorters,
  schools,
  filters,
  selection,
  favorites,
  isShowingFavorites,
});
