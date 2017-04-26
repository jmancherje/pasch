import { StackNavigator, TabNavigator } from 'react-navigation';

// import FilterContainer from '../containers/FilterContainer';
import AddFilter from './AddFilter';
import SchoolListContainer from '../containers/SchoolListContainer';
import SchoolInfoContainer from '../containers/SchoolInfoContainer';
import FavoritesListContainer from '../containers/FavoritesListContainer';

const SchoolListTabNavigator = TabNavigator({
  AllSchools: { screen: SchoolListContainer },
  FavoriteSchools: { screen: FavoritesListContainer },
}, {
  animationEnabled: true,
  tabBarOptions: {
    labelStyle: {
      fontSize: 16,
    },
    activeBackgroundColor: '#CEE1F8',
  },
});

export default StackNavigator({
  SchoolList: { screen: SchoolListTabNavigator },
  Filter: { screen: AddFilter },
  SchoolInfo: { screen: SchoolInfoContainer },
}, {
  mode: 'modal',
});
