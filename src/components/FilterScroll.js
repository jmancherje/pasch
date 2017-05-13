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
import displayFilter from '../utils/displayFilter';

const bounds = {
  minimum: {
    minGpa: 0,
    minSGpa: 0,
    healthcareHours: 0,
  },
  maximum: {
    minGpa: 4,
    minSGpa: 4,
    healthcareHours: 5000,
  },
};

const handleBetween = ({ min, max, property }) => {
  // TODO: get constants file with min / max for all numeric values
  const isMin = min === bounds.minimum[property];
  const isMax = max === bounds.maximum[property];
  const toFixed = /gpa/i.test(property) ? 2 : null;
  if (isMin && isMax) {
    return 'Any';
  } else if (isMin) {
    return `Below ${displayFilter(max, toFixed)}`;
  } else if (isMax) {
    return `Above ${displayFilter(min, toFixed)}`;
  }
  return `${displayFilter(min, toFixed)} ⇔ ${displayFilter(max, toFixed)}`;
};

export default class FilterScroll extends React.Component {
  props: {
    removeFilter: Function,
    min: number,
    max: number,
    property: string,
    isActive: boolean,
    value: ?any,
    type: string,
  };

  removeFilter = () => {
    const { removeFilter, property } = this.props;
    removeFilter({ property });
  };


  getFilterDescription = () => {
    const { type, value, property, min, max } = this.props;
    let title = '';
    switch (type) {
      case 'value':
        title = value ? 'Yes' : 'No';
        break;
      case 'between':
        title = handleBetween({ min, max, property });
    }
    return title;
  };

  render() {
    const { property } = this.props;
    return (
      <Button
        key={ property }
        transparent
        bordered
        primary
        style={ styles.filterItem }
        onLongPress={ this.removeFilter }
      >
        <View>
          <Text style={{ paddingTop: 10 }}>
            { keyDisplayMap[property] }
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
  },
};
