import { StackNavigator } from 'react-navigation';

import { HomeScreen, Filter } from '../App';

export default StackNavigator({
  Home: { screen: HomeScreen },
  Filter: { screen: Filter },
});