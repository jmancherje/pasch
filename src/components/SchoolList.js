// @flow
import React from 'react';
import { View, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import { List, ListItem, Icon, Button, Text } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';

import Divider from './Divider';

const nonFavoriteIcon = {
  name: 'heart-o',
  type: 'font-awesome',
  color: 'pink',
  style: {
    paddingRight: 15,
    fontSize: 35,
  },
};

export default class SchoolList extends React.Component {
  props: {
    setSelection: Function,
    removeFilter: Function,
    schools: Array<Object>,
    navigation: Object,
    filters: Array<Object>,
  };
  static navigationOptions = ({ navigation }) => ({
    title: <Text>PA Schools</Text>,
    headerRight: (
      <Button
        borderRadius={ 5 }
        buttonStyle={{ padding: 6, backgroundColor: '#517fa4' }}
        title="Filter"
        onPress={() => navigation.navigate('Filter')}
      />
    )
  });

  // TODO: make each list item it's own component
  // To prevent binding in render
  viewSchoolInfo = (selection: Object) => {
    this.props.setSelection(selection);
    this.props.navigation.navigate('SchoolInfo', { title: selection.name });
  };

  // TODO: same as above
  // toggleSchoolFavorite = (selection) => {
  //   this.props.favoriteSchool(selection);
  // };

  renderFilter = (filter: {
    type: string,
    property: string,
    value: string|number,
    min: number,
    max: number
  }, index: number) => {
    let title = '';
    switch (filter.type) {
      case 'value':
        title = `${filter.property}: ${filter.value}`;
        break;
      case 'above':
        title = `${filter.property} > ${filter.min}`;
        break;
      case 'below':
        title = `${filter.property} < ${filter.max}`;
        break;
    }
    return (
      <ListItem
        title={ title }
        key={ index }
        onPress={ this.props.removeFilter.bind(null, index) }
        rightIcon={{ name: 'close', style: { color: 'red' } }}
      />
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <List containerStyle={{ marginTop: 0 }}>
          { this.props.filters.length ? (<Divider title="Active Filters:" />) : null }
          { this.props.filters.map(this.renderFilter) }
          { (!Array.isArray(this.props.schools) || !this.props.schools.length) ? <Divider title="No Schools, try adjusting filters" /> : (
            this.props.schools.map((school, index, list) => {
              if (school.isLabel) {
                return <Divider title={school.title} key={school.title}/>;
              }
              return (
                <SwipeRow
                  key={`${school.name}_${school.state}_${index}`}
                  // leftOpenValue={65}
                  rightOpenValue={-65}
                  disableRightSwipe
                >
                  <ListItem
                    containerStyle={styles.standaloneRowBack}
                    component={ TouchableHighlight }
                    title={school.name}
                    subtitle={school.state}
                    titleContainerStyle={styles.title}
                    onPress={ () => console.log('clicked back item') }
                    rightIcon={ nonFavoriteIcon }
                  />
                  <ListItem
                    containerStyle={styles.foregroundRow}
                    component={ TouchableHighlight }
                    onPress={ this.viewSchoolInfo.bind(this, {
                      name: school.name,
                      state: school.state,
                    }) }
                    title={school.name}
                    subtitle={school.state}
                    titleContainerStyle={styles.title}
                    rightIcon={{ name: 'heart', type: 'evilicon', color: '#517fa4', size: 33 }}
                    // rightTitle={ "title" }
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
  title: {
    width: 200
  },
  hiddenItem: {
    padding: 30
  }
});
