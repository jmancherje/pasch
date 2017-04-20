import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class Divider extends React.Component {
  props: { title: string };
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
