// @flow
import { rangeRight, range } from 'lodash';

const filterOptions = {
  minGpa: rangeRight(200, 401, 5).map(num => String(num / 100)),
  minSGpa: null,
  state: ['Alabama', 'Arizona', 'Arkansas', 'California'],
  accreditation: ['Provisional', 'Contined', 'Probation'],
  greRequired: ['Is Required', 'Is Not Required'],
  pance: rangeRight(100, 70, 1).map(num => String(num)),
  healthcareHours: range(0, 5100, 100).map(num => String(num)),
};

filterOptions.minSGpa = filterOptions.minGpa.slice();

export default filterOptions;
