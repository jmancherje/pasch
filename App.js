import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

const configureHeader = ({ state, setParams }) => {
  let right = (
    <Button
      title={`${state.params.user}'s info`}
      onPress={() => setParams({ mode: 'info' })}
    />
  );
  if (state.params.mode === 'info') {
    right = (
      <Button
        title="Done"
        onPress={() => setParams({ mode: 'none' })}
      />
    );
  }
  return { right }
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'PA Schools',
    header: configureHeader,
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button
          onPress={() => navigate('Favorites', { user: 'Justin' })}
          title="See Favorites"
        />
      </View>
    );
  }
}

class Favorites extends React.Component {
  static navigationOptions = {
    title: ({ state }) => {
      if (state.params.mode === 'info') {
        return `${state.params.user}'s Info`;
      }
      return `Chat with ${state.params.user}`
    },
    header: configureHeader,
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>{`${params.user}'s Favorites`}</Text>
      </View>
    );
  }
}

class RecentChatsScreen extends React.Component {
  render() {
    return <View>
      <Text>Recent Chats</Text>
      <Button
        onPress={() => this.props.navigation.navigate('Favorites', { user: 'Justin' })}
        title="See Favorites"
      />
    </View>
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <View>
      <Text>All Contacts</Text>
      <Button
        onPress={() => this.props.navigation.navigate('Favorites', { user: 'Justin' })}
        title="See Favorites"
      />
    </View>
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});

MainScreenNavigator.navigationOptions = {
  title: 'My Chats',
};

const App = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Favorites: { screen: Favorites },
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
