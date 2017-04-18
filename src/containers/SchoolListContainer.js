import { connect } from 'react-redux';

import SchoolList from '../components/SchoolList';
import { setSelection } from '../actions';
import { getSortedFilteredList } from '../utils/getSortedList';

const mapStateToProps = (state) => {
  const { filters, sorters, schools } = state;
  return {
    schools: getSortedFilteredList(schools, sorters, filters),
  };
};

export default connect(mapStateToProps, {
  setSelection,
})(SchoolList);
