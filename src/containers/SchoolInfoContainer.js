import { connect } from 'react-redux';
import SchoolInfo from '../components/SchoolInfo';

const mapStateToProps = (state) => ({
  school: state.schools.find(school => school.name === state.selection.name),
});

export default connect(mapStateToProps)(SchoolInfo);
