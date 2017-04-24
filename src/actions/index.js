import { AsyncStorage } from 'react-native';

export const setFilter = (payload) => ({
  type: 'filters/SET',
  payload,
});

export const addFilter = (payload) => ({
  type: 'filters/ADD',
  payload,
});

export const resetFilter = (payload) => ({
  type: 'filters/RESET',
});

export const removeFilter = (payload) => ({
  type: 'filters/REMOVE',
  payload,
});

export const addSorter = (payload) => ({
  type: 'sorters/ADD',
  payload,
});

export const resetSorter = (payload) => ({
  type: 'sorters/RESET',
});

// Payload in this case is an object containing identifying information
// About the school. (name and state should be enough for uniqueness)
// May need to update each school with a unique ID
export const setSelection = (payload: Object) => ({
  type: 'selection/SET',
  payload,
});

// Payload: { name: string };
export const toggleFavorite = (payload: Object) => (dispatch, getState) => {
  dispatch({
    type: 'favorite/TOGGLE',
    payload,
  });
  // Get state after the favorites update and update stored favorites
  const favorites = getState().favorites;
  AsyncStorage.setItem('favorites', JSON.stringify(favorites));
};

export const showFavorites = () => ({
  type: 'showFavorites/ON',
});
export const showAll = () => ({
  type: 'showFavorites/OFF',
});
