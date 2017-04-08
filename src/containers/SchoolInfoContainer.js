import { connect } from 'react-redux';
import SchoolInfo from '../components/SchoolInfo';

const mapStateToProps = (state) => ({
  selection: state.selection,
});

export default connect(mapStateToProps)(SchoolInfo);
