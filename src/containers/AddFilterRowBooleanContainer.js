import { connect } from 'react-redux';
import AddFilterRowBoolean from '../components/AddFilterRowBoolean';
import {
  updateFilter,
  removeFilter,
} from '../actions';

const mapStateToProps = (state, { property }) => {
  const filter = state.filters.find(filterConfig => filterConfig.property === property) || {};
  return {
    filter,
    value: filter.value,
    isActive: filter.isActive,
  };
};

export default connect(mapStateToProps, {
  updateFilter,
  removeFilter,
})(AddFilterRowBoolean);
