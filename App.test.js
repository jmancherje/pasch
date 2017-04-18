import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

import { schoolData } from './src/constants';
import { sortBy, filterBy } from './src/utils/getSortedList';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

describe('FilterBy', () => {
  it('Filters by value', () => {
    const list = schoolData.slice();
    const filterList = [{
      type: 'value',
      value: 'another school 3',
      property: 'name',
    }];
    const newList = filterBy(filterList, list);
    expect(newList[0].name).toBe('another school 3');
  });

  it('Filters by min/max numerical values', () => {
    const list = schoolData.slice();
    const filterList = [{
      type: 'below',
      property: 'minGpa',
      max: 2.99,
    }];
    const newList = filterBy(filterList, list);
    expect(newList[0].name).toBe('some school 1');
    expect(newList[1].name).toBe('another school 3');
  });

  it('Filters with multiple filters', () => {
    const list = schoolData.slice();
    const filterList = [{
      type: 'value',
      value: 'California',
      property: 'state',
    }, {
      type: 'between',
      min: 2.76,
      max: 3.5,
      property: 'minGpa',
    }];
    const newList = filterBy(filterList, list);
    expect(newList.length).toBe(1);
    expect(newList[0].name).toBe('shelby 5');
  });
});
