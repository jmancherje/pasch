export const setFilter = (payload) => ({
  type: 'filters/SET',
  payload,
});

export const resetFilter = (payload) => ({
  type: 'filters/RESET',
});

// Payload in this case is an object containing identifying information
// About the school. (name and state should be enough for uniqueness)
// May need to update each school with a unique ID
export const setSelection = (payload: Object) => ({
  type: 'selection/SET',
  payload,
});
