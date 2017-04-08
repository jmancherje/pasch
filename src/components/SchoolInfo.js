import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import schoolData from '../constants/schoolData';

export default class SchoolInfo extends React.Component {
  static propTypes = {
    selection: PropTypes.object.isRequired,
  };
  static navigationOptions = {
    title: 'SchoolInfo',
  };
  constructor(props) {
    super(props);

    const school = schoolData.find(
      schoolInfo => schoolInfo.name === this.props.selection.name
    );

    this.state = { school };
  }
  renderInfo = () => {
    const school = this.state.school;
    const info = [
      <Text key="name" h2>{school.name}</Text>,
      <Text key="state" h3>{school.state}</Text>,
    ];

    Object.keys(school).forEach((key) => {
      if (school[key] && !(key === 'name' || key === 'state')) {
        info.push(
          <Text key={ key }>{ `${key}: ${school[key]}` }</Text>
        );
      }
    });

    return info;
  };
  render() {
    return (
      <View>
        { this.renderInfo() }
      </View>
    );
  }
}
