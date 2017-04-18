// @flow

export const filterByNumericalProperty = ({
  property,
  type,
  min,
  max,
  schools,
}: {
  property: string,
  type: string, // oneOf: below, between, above,
  min: number,
  max: number,
  schools: Array,
}) => {
  const list = schools.slice();
  if (type === 'below') {
    return list.filter(school => school[property] <= max);
  }
  if (type === 'above') {
    return list.filter(school => school[property] >= min);
  }
  return list.filter(school => school[property] <= max && school.property >= min);
};

export const filterByStringProperty = ({
  property,
  value,
  string,
  match,
  schools,
}: {
  property: string,
  value: string,
  match: boolean, // true filters for the item, false filters against it
  schools: Array,
}) => {
  const list = schools.slice();
  return list.filter(school => school.filter((school[property] === value) === match));
};
