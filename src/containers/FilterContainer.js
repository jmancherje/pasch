import { connect } from 'react-redux';
import Filter from '../components/Filter';
import { addSorter, addFilter, resetSorter, resetFilter } from '../actions';

const mapStateToProps = (state) => ({
  filters: state.filters,
});

export default connect(mapStateToProps, {
  addSorter,
  addFilter,
  resetSorter,
  resetFilter,
})(Filter);
