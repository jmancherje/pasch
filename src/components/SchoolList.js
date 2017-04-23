// @flow
import React from 'react';
import { View, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
// import { SwipeRow } from 'react-native-swipe-list-view';

import { Container, List, Body, Content, Text, Icon, ListItem } from 'native-base';

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
        key={ index }
        // title={ title }
        // onPress={ this.props.removeFilter.bind(null, index) }
        // rightIcon={{ name: 'close', style: { color: 'red' } }}
      >
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
              <ListItem itemDivider style={styleObj.divider}>
                <Text>No Schools found, try adjusting filters</Text>
              </ListItem>
            ) : (
              this.props.schools.map((school, index, list) => {
                if (school.isLabel) {
                  return (
                    <ListItem itemDivider style={styleObj.divider} key={ school.title }>
                      <Text>{ school.title }</Text>
                    </ListItem>
                  );
                }
                return (
                  <ListItem
                    key={`${school.name}_${school.state}_${index}`}
                    // containerStyle={styles.foregroundRow}
                    // component={ TouchableHighlight }
                    // onPress={ this.viewSchoolInfo.bind(this, {
                    //   name: school.name,
                    //   state: school.state,
                    // }) }
                    style={styleObj.listRow}
                    // title={school.name}
                    // subtitle={school.state}
                    // titleContainerStyle={styles.title}
                    // rightIcon={{ name: 'star', type: 'evilicon', color: '#517fa4', size: 33 }}
                    // avatar={{ uri: 'https://upload.wikimedia.org/wikipedia/en/6/61/Touro_University_California_seal.png' }}
                  >
                    <Body style={styleObj.listBody}>
                      <View style={styleObj.listLeft}>
                        <Text>{ school.name }</Text>
                        <Text note>{ school.state }</Text>
                      </View>
                      <View style={styleObj.listRight}>
                        <Icon name="menu" size={30} color="#900" />
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

const styleObj = {
  divider: {
    backgroundColor: '#e0e3e6',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  listRow: {
    backgroundColor: '#fff',
    borderColor: 'blue',
    borderWidth: 1,
    paddingRight: 0,
    marginLeft: 0,
  },
  listBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: 'red',
  },
  listLeft: {
    flex: 9,
  },
  listRight: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'red',
  },
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
  },
  divider: {
    backgroundColor: '#e0e3e6',
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
