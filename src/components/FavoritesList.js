// @flow
import React from 'react';
import {
  ScrollView,
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
import FilterScrollContainer from '../containers/FilterScrollContainer';

const Divider = ({ text }: { text: string }) => (
  <ListItem itemDivider style={styles.divider}>
    <Text>{ text }</Text>
  </ListItem>
);

export default class FavoritesList extends React.Component {
  props: {
    setSelection: Function,
    removeFilter: Function,
    showFavorites: Function,
    showAll: Function,
    schools: Array<Object>,
    navigation: Object,
    activeFilters: Array<Object>,
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

  render() {
    return (
      <Container>
        <Content>
          <List containerStyle={{ marginTop: 0 }}>
            { this.props.activeFilters.length ? (
              <ScrollView horizontal >
                <ListItem>
                  { this.props.activeFilters.map((filter, index) =>
                    <FilterScrollContainer
                      { ...filter }
                      key={ filter.property }
                    />
                  ) }
                </ListItem>
              </ScrollView>
            ) : null }
            { (!Array.isArray(this.props.schools) || !this.props.schools.length) ? (
              <Divider text="No Schools found, add more schools or try adjusting filters" />
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
