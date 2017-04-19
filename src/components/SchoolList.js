// @flow
import React from 'react';
import { ScrollView, TouchableHighlight, View, StyleSheet } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';

// const favoriteIcon = {
//   name: 'heart',
//   type: 'font-awesome',
//   color: '#74db67',
//   style: { paddingRight: 15, fontSize: 45, borderWidth: 2, borderColor: 'black' },
// };

const nonFavoriteIcon = {
  name: 'heart-o',
  type: 'font-awesome',
  color: 'pink',
  style: {
    paddingRight: 15,
    fontSize: 35,
  },
};

class Divider extends React.Component {
  props: { title: string };
  render() {
    return (
      <ListItem
        title={ this.props.title }
        hideChevron
        component={ View }
        containerStyle={{ backgroundColor: '#e0e3e6'}}
      />
    );
  }
}

export default class SchoolList extends React.Component {
  props: {
    setSelection: Function,
    schools: Array<Object>,
    navigation: Object,
  };
  static navigationOptions = {
    title: 'PA Schools',
    header: ({ navigate }) => ({
      right: (
        <Icon
          size={ 33 }
          name="gear"
          type="evilicon"
          color="#517fa4"
          containerStyle={{ marginRight: 20 }}
          onPress={() => navigate('Filter')}
        />
      )
    })
  };

  // TODO: make each list item it's own component
  // To prevent binding in render
  viewSchoolInfo = (selection: Object) => {
    this.props.setSelection(selection);
    this.props.navigation.navigate('SchoolInfo');
  };

  // TODO: same as above
  // toggleSchoolFavorite = (selection) => {
  //   this.props.favoriteSchool(selection);
  // };

  render() {
    // Safety First:
    return (
      <ScrollView style={styles.container}>
        <List containerStyle={{ marginTop: 0 }}>
          { (!Array.isArray(this.props.schools) || !this.props.schools.length) ? <Divider title="No Schools, try adjusting filters" /> : (
            this.props.schools.map((school, index, list) => {
              if (school.isLabel) {
                return <Divider title={school.title} key={school.title}/>;
              }
              // TODO: implement this
              // const star = favorites.includes(school.name) ? 'ios-star-outline' : 'ios-star-full';
              return (
                <SwipeRow
                  key={`${school.name}_${school.state}_${index}`}
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  disableRightSwipe
                >
                  <ListItem
                    containerStyle={styles.standaloneRowBack}
                    component={ TouchableHighlight }
                    title="hidden"
                    subtitle="also hidden"
                    onPress={ () => console.log('clicked back item') }
                    rightIcon={ nonFavoriteIcon }
                  />
                  <ListItem
                    containerStyle={styles.foregroundRow}
                    component={ TouchableHighlight }
                    title={school.name}
                    onPress={ this.viewSchoolInfo.bind(this, {
                      name: school.name,
                      state: school.state,
                    }) }
                    subtitle={school.state}
                    // leftIcon={{ name: 'flight-takeoff' }}
                    rightTitle="View"
                    avatar={{ uri: 'https://upload.wikimedia.org/wikipedia/en/6/61/Touro_University_California_seal.png' }}
                  />
                </SwipeRow>
              );
            })
          ) }
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  standaloneRowBack: {
    backgroundColor: '#dee8f7',
  },
  foregroundRow: {
    backgroundColor: '#fff',
  },
  hiddenItem: {
    padding: 30
  }
});
