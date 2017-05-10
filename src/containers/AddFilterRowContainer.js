import { connect } from 'react-redux';
import AddFilterRow from '../components/AddFilterRow';
import {
  updateFilter,
  removeFilter,
} from '../actions';

const mapStateToProps = (state, { property }) => {
  const filter = state.filters.find(filterConfig => filterConfig.property === property) || {};
  return {
    filter,
    isActive: filter.isActive,
  };
};

export default connect(mapStateToProps, {
  updateFilter,
  removeFilter,
})(AddFilterRow);
