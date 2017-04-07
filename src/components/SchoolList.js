import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { TouchableHighlight, View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firstBy from 'thenby';

import schoolData from '../constants/schoolData';

class Divider extends React.Component {
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
  constructor(props) {
    super(props)

    const schoolList = schoolData.slice();
    schoolList.sort(firstBy('state', {ignoreCase: true}).thenBy('name', {ignoreCase: true}));
    const listWithLabels = [];
    schoolList.forEach((school, i, list) => {
      if (i === 0 || list[i].state.toLowerCase() !== list[i-1].state.toLowerCase()) {
        listWithLabels.push({title: school.state, isLabel: true});
      }
      listWithLabels.push(school);
    });
    console.log(listWithLabels)

    this.state = {
      sortBy: 'state',
      schoolList: listWithLabels,
    }
  }
  render() {
    // Safety First:
    if (!Array.isArray(this.state.schoolList) || !this.state.schoolList.length) {
      return 'Empty List?';
    }
    return (
      <List containerStyle={{ marginTop: 0 }}>
        {this.state.schoolList.map((school, index, list) => {
          if (school.isLabel) {
            return <Divider title={school.title} key={school.title}/>
          }
          return <ListItem
            avatar
            component={ TouchableHighlight }
            key={`${school.name}_${school.state}`}
            title={school.name}
            onPress={ () => console.log('pressed') }
            subtitle={school.state}
            // leftIcon={{ name: 'flight-takeoff' }}
            rightTitle="View"
            avatar={{ uri: 'https://upload.wikimedia.org/wikipedia/en/6/61/Touro_University_California_seal.png' }}
          /> 
        })}
      </List>
    );
  }
}
