import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';

import SchoolList from './src/components/SchoolList';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'PA Schools',
    header: ({ navigate }) => ({
      right: (
        <Icon
          size={ 33 }
          name='gear'
          type='evilicon'
          color='#517fa4'
          containerStyle={{ marginRight: 20 }}
          onPress={() => navigate('Filter', { updateSortBy: this.updateSortBy })}
        />
      )
    })
  };
  updateSortBy = (sortBy) => {
    this.setState({ sortBy });
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <SchoolList sortBy="name" />
      </ScrollView>
    );
  }
}

class Filter extends React.Component {
  static navigationOptions = {
    title: "Filter",
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          buttonStyle={{ marginTop: 15 }}
          title="Sort By State"
          onPress={() => {
            // TODO set up redux so we can update sortBy here.
            // this.props.navigation.state.params.updateSortBy('state');
            navigate('Home');
          }}
        />
        <Button
          buttonStyle={{ marginTop: 15 }}
          title="Sort By Name"
          onPress={() => {
            // this.props.navigation.state.params.updateSortBy('name');
            navigate('Home');
          }}
        />
      </View>
    );
  }
}

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Filter: { screen: Filter },
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
