import { identity } from 'lodash';

export default {
  name: identity,
  state: identity,
  pance_1: (value) => `${value * 100}%`,
  pance_5: (value) => `${value * 100}%`,
  accreditation: identity,
  minGpa: identity,
  minGpaRecommended: identity,
  minSGpa: identity,
  minSGpaRecommended: identity,
  healthcareHours: identity,
  healthcareHoursRecommended: identity,
  greRequired: (bool) => bool ? 'Yes' : 'No',
  misc: identity,
  website: identity,
};
