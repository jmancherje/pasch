import { connect } from 'react-redux';
import Filter from '../components/Filter';
import { setFilter, resetFilter } from '../actions';

const mapStateToProps = (state) => ({
  filter: state.filters,
});

export default connect(mapStateToProps, {
  setFilter,
  resetFilter,
})(Filter);