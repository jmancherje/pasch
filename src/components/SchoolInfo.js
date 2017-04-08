import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

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
  render() {
    const { school } = this.state;
    return (
      <View>
        <Text>{ school.name }</Text>
        <Text>{ school.state }</Text>
        <Text>{ school.address }</Text>
        <Text>{ school.accredidation }</Text>
        <Text>{ school.pacePassPercentage }</Text>
        <Text>{ school.workHours }</Text>
      </View>
    );
  }
}
