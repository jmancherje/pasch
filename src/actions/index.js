export const setFilter = (payload) => ({
  type: 'filters/SET',
    payload,
});

export const resetFilter = (payload) => ({
  type: 'filters/RESET',
});