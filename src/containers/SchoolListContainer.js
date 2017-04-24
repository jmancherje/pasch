import { connect } from 'react-redux';

import SchoolList from '../components/SchoolList';
import {
  setSelection,
  removeFilter,
  toggleFavorite,
  showFavorites,
  showAll,
} from '../actions';
import { getSortedFilteredList } from '../utils/getSortedList';

const mapStateToProps = (state) => {
  const { filters, sorters, schools, favorites, isShowingFavorites } = state;
  return {
    filters,
    isShowingFavorites,
    schools: getSortedFilteredList(schools, sorters, filters, favorites, isShowingFavorites),
  };
};

export default connect(mapStateToProps, {
  removeFilter,
  setSelection,
  toggleFavorite,
  showFavorites,
  showAll,
})(SchoolList);
