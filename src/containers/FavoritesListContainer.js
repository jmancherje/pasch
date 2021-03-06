import { connect } from 'react-redux';

import FavoritesList from '../components/FavoritesList';
import {
  setSelection,
  toggleFavorite,
  showFavorites,
  showAll,
} from '../actions';
import { getSortedFilteredList } from '../utils/getSortedList';

const mapStateToProps = (state) => {
  const { filters, sorters, schools, favorites } = state;
  return {
    activeFilters: filters.filter(filt => filt.isActive),
    schools: getSortedFilteredList(schools, sorters, filters, favorites, true),
  };
};

export default connect(mapStateToProps, {
  // removeFilter,
  setSelection,
  toggleFavorite,
  showFavorites,
  showAll,
})(FavoritesList);
