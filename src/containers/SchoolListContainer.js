import { connect } from 'react-redux';

import SchoolList from '../components/SchoolList';
import {
  showFavorites,
} from '../actions';
import { getSortedFilteredList } from '../utils/getSortedList';

const mapStateToProps = (state) => {
  const { filters, sorters, schools, favorites } = state;
  return {
    activeFilters: filters.filter(filt => filt.isActive),
    schools: getSortedFilteredList(schools, sorters, filters, favorites, false),
  };
};

export default connect(mapStateToProps, {
  showFavorites,
})(SchoolList);
