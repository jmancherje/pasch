import React from 'react';
import { StyleSheet, ScrollView, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import SchoolList from './src/components/SchoolList';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'PA Schools',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <SchoolList />
      </ScrollView>
    );
  }
}

class Favorites extends React.Component {
  static navigationOptions = {
    title: "Favorites",
  };
  render() {
    return (
      <View>
        <Text>Favorites</Text>
      </View>
    );
  }
}

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Favorites: { screen: Favorites },
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
