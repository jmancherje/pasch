// @flow
import { connect } from 'react-redux';

import {
  setSelection
} from '../actions';

import SchoolListItem from '../components/SchoolListItem';

const mapStateToProps = (state, { name }) => {
  const school = state.schools.find(schoolItem => schoolItem.name === name);
  return {
    state: school.state,
    isFavorite: state.favorites[name],
  };
};

export default connect(mapStateToProps, {
  setSelection
})(SchoolListItem);
