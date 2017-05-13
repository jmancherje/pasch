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

export default class SchoolList extends React.Component {
  props: {
    showFavorites: Function,
    schools: Array<Object>,
    navigation: Object,
    activeFilters: Array<Object>,
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

  showFavorites = () => {
    this.props.navigation.navigate('FavoriteSchools');
  }

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
                      key={ filter.property }
                      filter={ filter }
                    />
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
