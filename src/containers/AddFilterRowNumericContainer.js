import { connect } from 'react-redux';
import AddFilterRowNumeric from '../components/AddFilterRowNumeric';
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
})(AddFilterRowNumeric);
