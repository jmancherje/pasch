// @flow
import { rangeRight, range } from 'lodash';

const filterOptions = {
  minGpa: rangeRight(200, 401, 5).map(num => String(num / 100)),
  state: ['California', 'Colorado', 'Hawaii'],
  accreditation: ['Probation', 'Continued'],
  workHours: range(0, 5100, 100).map(num => String(num)),
  averageGpa: null,
};

filterOptions.averageGpa = filterOptions.minGpa.slice();

export default filterOptions;
