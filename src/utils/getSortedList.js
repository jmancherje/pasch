// @flow
import { reject, eachRight } from 'lodash';

const numericProperties = ['minGpa', 'averageGpa', 'dataYear', 'classSize', 'pacePassPercentage', 'workHours'];
const fullLabelProperties = ['state', 'accreditation'];
const alphabeticalProperties = ['name'];
export const addLabels = (finalList: Array<Object>, { property }: { property: string }): Array<Object> => {
  const list = [];
  // const isNumeric = numericProperties.includes(property);
  const isFullLabel = fullLabelProperties.includes(property);
  // const isAlphabetical = alphabeticalProperties.includes(property);

  finalList.forEach((school, index, schools) => {
    if (isFullLabel) {
      if (
        index === 0 ||
        schools[index][property].toLowerCase() !== schools[index - 1][property].toLowerCase()
      ) {
        list.push({ title: school[property], isLabel: true });
      }
    }
    list.push(school);
  });
  return list;
};

const sortFunctions = {
  default: (property) => (a, b) => a[property].toLowerCase() < b[property].toLowerCase(),
  reverse: (property) => (a, b) => a[property].toLowerCase() > b[property].toLowerCase(),
};

// Takes an array of sort objects and composes the sorting
// And returns a copy of the sorted array
export const sortBy = (schools:Array<Object>, sortList: Array<Object>) => {
  const schoolList = schools.slice();
  eachRight(sortList, (sorter) => {
    schoolList.sort(sortFunctions[sorter.functionType](sorter.property));
  });
  return schoolList;
};

type filterType = {
  type: 'above'|'below'|'between'|'value'|'notValue',
  property: string,
  min?: number,
  max?: number,
  reverse?: boolean, // FilterNot or reject
  value?: string,
};

export const filterBy = (schools: Array<Object>, filterList: Array<filterType>) => {
  let schoolList = schools.slice();
  filterList.forEach(filter => {
    const { min, max, type, reverse, value, property } = filter;
    // Above, below, between for numbers
    switch (type) {
      case 'above':
        schoolList = schoolList.filter(school => school[property] >= min);
        break;
      case 'below':
        schoolList = schoolList.filter(school => school[property] <= max);
        break;
      case 'between':
        schoolList = schoolList.filter(school => school[property] <= max && school[property] >= min);
        break;
      case 'value':
        schoolList = schoolList.filter(school => school[property] === value);
        break;
      case 'notValue':
        schoolList = reject(schoolList, school => school[property] === value);
        break;
      default:
        break;
    }
  });
  return schoolList;
};

export const getSortedFilteredList = (
  schools: Array<Object>,
  sorters: Array<Object>,
  filters: Array<Object>,
) => {
  const filteredSchools = filterBy(schools, filters);
  const sortedSchools = sortBy(filteredSchools, sorters);
  return addLabels(sortedSchools, sorters[0])
  // return sortedSchools;
}

// addLabels(sortBy(sorters, filterBy(filters, schools)), sorters[0]);
