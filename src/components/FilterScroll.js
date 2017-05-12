// @flow
import React from 'react';
import {
  View,
} from 'react-native';
import {
  Text,
  Button,
} from 'native-base';

import keyDisplayMap from '../constants/keyDisplayMap';

export default class FilterScroll extends React.Component {
  props: {
    removeFilter: Function,
    filter: Object,
  };

  removeFilter = () => {
    const { removeFilter, filter } = this.props;
    removeFilter({ property: filter.property });
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
      case 'between':
        title = `${filter.min} ⇔ ${filter.max}`;
    }
    return (
      <Button
        key={ filter.property }
        transparent
        bordered
        primary
        style={ styles.filterItem }
        onLongPress={ this.removeFilter }
      >
        <View>
          <Text style={{ paddingTop: 10 }}>
            { keyDisplayMap[filter.property] }
          </Text>
          <Text style={{ paddingBottom: 10 }}>
            { title }
          </Text>
        </View>
      </Button>
    );
  };

  getFilterDescription = () => {
    const { filter } = this.props;
    let title = '';
    switch (filter.type) {
      case 'value':
        title = filter.value ? 'Yes' : 'No';
        break;
      case 'between':
        // TODO: handle below x or above y
        title = `${filter.min} ⇔ ${filter.max}`;
    }
    return title;
  };

  render() {
    const { filter } = this.props;
    return (
      <Button
        key={ filter.property }
        transparent
        bordered
        primary
        style={ styles.filterItem }
        onLongPress={ this.removeFilter }
      >
        <View>
          <Text style={{ paddingTop: 10 }}>
            { keyDisplayMap[filter.property] }
          </Text>
          <Text style={{ paddingBottom: 10 }}>
            { this.getFilterDescription() }
          </Text>
        </View>
      </Button>
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
