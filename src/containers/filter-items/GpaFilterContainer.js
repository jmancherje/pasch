import { connect } from 'react-redux';
import GpaFilter from '../../components/filters/GpaFilter';
import {
  addFilter,
} from '../../actions';

const mapStateToProps = (state, { property }) => ({
  filter: state.filters.find(filter => filter.property === property) || {},
});

export default connect(mapStateToProps, {
  addFilter,
})(GpaFilter);
