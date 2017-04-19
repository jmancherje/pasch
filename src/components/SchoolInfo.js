// @flow
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

export default class SchoolInfo extends React.Component {
  props: {
    school: Object,
  };
  static navigationOptions = {
    title: 'SchoolInfo',
  };
  renderInfo = () => {
    const { school } = this.props;
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
