import { StackNavigator } from 'react-navigation';

import FilterContainer from '../containers/FilterContainer';
import SchoolListContainer from '../containers/SchoolListContainer';

export default StackNavigator({
  SchoolList: { screen: SchoolListContainer },
  Filter: { screen: FilterContainer },
});