import { identity } from 'lodash';

export default {
  name: identity,
  state: identity,
  pance: (value) => `${value * 100}%`,
  accreditation: identity,
  minGpa: identity,
  minSGpa: identity,
  healthcareHours: identity,
  greRequired: (bool) => bool ? 'Yes' : 'No',
  misc: identity,
  website: identity,
};
