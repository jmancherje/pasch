// @flow
import React from 'react';
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

const Divider = ({ text }: { text: string }) => (
  <ListItem itemDivider style={styles.divider}>
    <Text>{ text }</Text>
  </ListItem>
);

export default class FavoritesList extends React.Component {
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
    title: 'My Schools',
    headerTitleStyle: {
      color: '#312e4e',
    },
    tabBarLabel: 'My Schools',
    headerBackTitle: 'Back',
    tabBarIcon: (
      <Icon name="person" />
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

  showAll = () => {
    this.props.navigation.navigate('AllSchools');
  };

  // TODO: make each list item it's own component
  // To prevent binding in render
  viewSchoolInfo = (selection: Object) => {
    this.props.setSelection(selection);
    this.props.navigation.navigate('SchoolInfo', {
      name: selection.name,
    });
  };

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
    }
    return (
      <ListItem key={ index }>
        <Text>{ title }</Text>
      </ListItem>
    );
  };

  render() {
    return (
      <Container>
        <Content>
          <List containerStyle={{ marginTop: 0 }}>
            { this.props.filters.length ? (
              <Divider text="Active Filters:" />
            ) : null }
            { this.props.filters.map(this.renderFilter) }
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
                    hideFavoriteIcon
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
  listRow: {
    backgroundColor: '#fff',
    paddingRight: 0,
    marginLeft: 0,
  },
  listBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  listLeft: {
    flex: 11,
  },
  listRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
