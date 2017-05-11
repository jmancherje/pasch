import { connect } from 'react-redux';

import FilterScroll from '../components/FilterScroll';
import {
  removeFilter,
} from '../actions';

export default connect(null, {
  removeFilter,
})(FilterScroll);
