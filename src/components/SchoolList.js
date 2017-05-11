// @flow
import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import {
  Container,
  List,
  Content,
  Text,
  ListItem,
  Button,
} from 'native-base';
import { Icon } from 'react-native-elements';

import SchoolListItemContainer from '../containers/SchoolListItemContainer';
import keyDisplayMap from '../constants/keyDisplayMap';

const Divider = ({ text }: { text: string }) => (
  <ListItem itemDivider style={styles.divider}>
    <Text>{ text }</Text>
  </ListItem>
);

export default class SchoolList extends React.Component {
  props: {
    setSelection: Function,
    removeFilter: Function,
    toggleFavorite: Function,
    showFavorites: Function,
    showAll: Function,
    schools: Array<Object>,
    navigation: Object,
    filters: Array<Object>,
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'All Schools',
    headerTitleStyle: {
      color: '#312e4e'
    },
    tabBarLabel: 'All Schools',
    headerBackTitle: 'Back',
    tabBarIcon: (
      <Icon name="list" />
    ),
    headerRight: (
      <Button
        transparent
        style={{ marginRight: 10 }}
        onPress={() => navigation.navigate('Filter')}
      >
        <Text>Filter</Text>
      </Button>
    )
  });

  // TODO: make each list item it's own component
  // To prevent binding in render
  viewSchoolInfo = (selection: Object) => {
    this.props.setSelection(selection);
    this.props.navigation.navigate('SchoolInfo', {
      name: selection.name,
    });
  };

  showFavorites = () => {
    this.props.navigation.navigate('FavoriteSchools');
  }

  // TODO: same as above
  toggleFavorite = (name: string) => {
    this.props.toggleFavorite({ name });
  };

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
      case 'between':
        title = `${filter.min} ⇔ ${filter.max}`;
    }
    return (
      <Button
        key={ filter.property }
        transparent
        bordered
        primary
        style={ styles.filterItem }
        onLongPress={ () => console.log('pressed long') }
      >
        <View>
          <Text style={{ paddingTop: 10 }}>
            { keyDisplayMap[filter.property] }
          </Text>
          <Text style={{ paddingBottom: 10 }}>
            { title }
          </Text>
        </View>
      </Button>
    );
  };

  render() {
    const activeFilters = this.props.filters.filter(fil => fil.isActive);
    return (
      <Container>
        <Content>
          <List containerStyle={{ marginTop: 0 }}>
            { activeFilters.length ? (
              <ScrollView
                horizontal
              >
                <ListItem>
                  { activeFilters.map((filter, index) =>
                    this.renderFilter(filter, index)
                  ) }
                </ListItem>
              </ScrollView>
            ) : null }
            { (!Array.isArray(this.props.schools) || !this.props.schools.length) ? (
              <Divider text="No Schools found, try adjusting filters" />
            ) : (
              this.props.schools.map((school, index, list) => {
                if (school.isLabel) {
                  return (
                    <Divider text={ school.title } key={ school.title } />
                  );
                }
                return (
                  <SchoolListItemContainer
                    key={ `${school.name}_${school.state}` }
                    name={ school.name }
                    navigation={ this.props.navigation }
                  />
                );
              })
            ) }
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  divider: {
    backgroundColor: '#e0e3e6',
  },
  filterItem: {
    marginRight: 10,
    paddingRight: 10,
    // borderRightWidth: 1,
    // borderRightColor: 'grey',
  },
};
