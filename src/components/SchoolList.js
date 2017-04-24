// @flow
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  Container,
  List,
  Body,
  Content,
  Text,
  ListItem,
  Button,
} from 'native-base';

import Divider from './Divider';

export default class SchoolList extends React.Component {
  props: {
    setSelection: Function,
    removeFilter: Function,
    toggleFavorite: Function,
    schools: Array<Object>,
    navigation: Object,
    filters: Array<Object>,
  };
  static navigationOptions = ({ navigation }) => ({
    title: <Text>All Schools</Text>,
    headerRight: (
      <Button
        small
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
    this.props.navigation.navigate('SchoolInfo', { title: selection.name });
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
            { this.props.filters.length ? (<Divider title="Active Filters:" />) : null }
            { this.props.filters.map(this.renderFilter) }
            { (!Array.isArray(this.props.schools) || !this.props.schools.length) ? (
              <ListItem itemDivider style={styles.divider}>
                <Text>No Schools found, try adjusting filters</Text>
              </ListItem>
            ) : (
              this.props.schools.map((school, index, list) => {
                if (school.isLabel) {
                  return (
                    <ListItem itemDivider style={styles.divider} key={ school.title }>
                      <Text>{ school.title }</Text>
                    </ListItem>
                  );
                }
                return (
                  <ListItem
                    key={`${school.name}_${school.state}_${index}`}
                    style={styles.listRow}
                    onPress={ this.viewSchoolInfo.bind(this, {
                      name: school.name,
                      state: school.state,
                    }) }
                  >
                    <Body style={styles.listBody}>
                      <View style={styles.listLeft}>
                        <Text>{ school.name }</Text>
                        <Text note>{ school.state }</Text>
                      </View>
                      <View style={styles.listRight}>
                        <Icon
                          size={ 30 }
                          name="heart"
                          type="evilicon"
                          color="#517fa4"
                          onPress={ this.toggleFavorite.bind(this, school.name) }
                        />
                      </View>
                    </Body>
                  </ListItem>
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
