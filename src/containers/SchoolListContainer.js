import { connect } from 'react-redux';
import SchoolList from '../components/SchoolList';

const mapStateToProps = (state) => ({
  filter: state.filters,
});

export default connect(mapStateToProps)(SchoolList);