import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { TouchableHighlight, View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firstBy from 'thenby';

import schoolData from '../constants/schoolData';

const getSortedList = (sortBy = 'state', schoolData) => {
  // Update sorted list based on sorted prop
  const schoolList = schoolData.slice();
  // Requires two sorts because states have many schools
  if (sortBy === 'state') {
    schoolList.sort(firstBy('state', {ignoreCase: true}).thenBy('name', {ignoreCase: true}));
  } else {
    schoolList.sort(firstBy(sortBy, {ignoreCase: true}));
  }

  const listWithLabels = [];
  schoolList.forEach((school, i, list) => {
    if (
      (sortBy === 'state') &&
      (i === 0 || list[i][sortBy].toLowerCase() !== list[i-1][sortBy].toLowerCase())
    ) {
      listWithLabels.push({title: school[sortBy], isLabel: true});
    // Else if alphabetical sort
    // (numerical sort will not have dividers for now)
    } else if (
      (sortBy === 'name' || sortBy === 'accredidation') &&
      (i === 0 || list[i][sortBy][0].toLowerCase() !== list[i-1][sortBy][0].toLowerCase())
    ) {
      listWithLabels.push({title: school[sortBy][0], isLabel: true });
    }
    listWithLabels.push(school);
  });
  return listWithLabels;  
}

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

    const { sortBy } = this.props;
    
    this.state = {
      schoolList: getSortedList(sortBy, schoolData),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sortBy !== this.props.sortBy) {
      this.setState({
        schoolList: getSortedList(nextProps.sortBy, schoolData)
      })
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
            key={`${school.name}_${school.state}_${index}`}
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
