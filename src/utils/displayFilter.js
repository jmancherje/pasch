export default (val: number, toFixed?: number) => {
  if (typeof toFixed === 'number') {
    return (Math.floor(+val * 100) / 100).toFixed(toFixed);
  }
  return val;
};
