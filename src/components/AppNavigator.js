import { StackNavigator } from 'react-navigation';

import FilterContainer from '../containers/FilterContainer';
import SchoolListContainer from '../containers/SchoolListContainer';
import SchoolInfoContainer from '../containers/SchoolInfoContainer';

export default StackNavigator({
  SchoolList: { screen: SchoolListContainer },
  Filter: { screen: FilterContainer },
  SchoolInfo: { screen: SchoolInfoContainer },
});
