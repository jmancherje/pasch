// @flow
import { combineReducers } from 'redux';

import AppNavigator from '../components/AppNavigator';

import testData from '../constants/testData.json';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState ? newState : state;
};

type Filter = {
  value?: any,
  type?: string,
  min?: number,
  max?: number,
  isActive: boolean,
  property: string,
};
const updateFilter = (state, filterUpdate: Filter) => {
  const filterList = [...state];
  const index = filterList.findIndex(filter => filter.property === filterUpdate.property);
  if (index === -1) {
    return state;
  }
  filterList[index] = Object.assign(filterList[index], filterUpdate);
  return filterList;
};

const defaultFilters = [{
  property: 'minGpa',
  type: 'between',
  min: 0,
  max: 3.2,
  isActive: false,
  value: false,
}, {
  property: 'minSGpa',
  type: 'between',
  min: 0,
  max: 3.2,
  isActive: false,
  value: false,
}, {
  property: 'healthcareHours',
  type: 'between',
  min: 0,
  max: 5000,
  isActive: false,
  value: false,
}, {
  property: 'greRequired',
  type: 'value',
  value: false,
  isActive: false,
  min: 0,
  max: 0,
}];
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
    case 'filters/UPDATE':
      return updateFilter(state, payload);
    case 'filters/REMOVE':
      // Payload is index of filter to remove
      return updateFilter(state, { property: payload.property, isActive: false });
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

const schools = (state = testData, { type, payload }) => {
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
