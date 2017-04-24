import { connect } from 'react-redux';

import SchoolList from '../components/SchoolList';
import {
  setSelection,
  removeFilter,
  toggleFavorite
} from '../actions';
import { getSortedFilteredList } from '../utils/getSortedList';

const mapStateToProps = (state) => {
  const { filters, sorters, schools, favorites } = state;
  return {
    filters,
    schools: getSortedFilteredList(schools, sorters, filters, favorites),
  };
};

export default connect(mapStateToProps, {
  removeFilter,
  setSelection,
  toggleFavorite,
})(SchoolList);
