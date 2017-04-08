import { connect } from 'react-redux';
import SchoolList from '../components/SchoolList';
import { setSelection } from '../actions';

const mapStateToProps = (state) => ({
  filter: state.filters,
});

export default connect(mapStateToProps, {
  setSelection,
})(SchoolList);
