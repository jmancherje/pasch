// @flow
import React from 'react';
import {
  View,
} from 'react-native';
import {
  Text,
  Body,
  ListItem,
  Row,
  Grid,
} from 'native-base';
import Switch from 'react-native-switch-pro';
import MultiSlider from 'react-native-multi-slider';

import keyDisplayMap from '../constants/keyDisplayMap';

type Props = {
  filter: Object,
  updateFilter: Function,
  removeFilter: Function,
  property: string,
  min: number,
  max: number,
  isActive: boolean,
  step: number,
  toFixed?: number,
};

export default class GpaFilter extends React.Component {
  props: Props;
  state: {
    lower: number,
    upper: number,
  };
  constructor(props: Props) {
    super(props);
    const { max, min, filter } = this.props;
    // Initialize these values IF the user already has
    // A filter set for minimum GPA
    this.state = {
      upper: filter.max || max || 100,
      lower: filter.min || min || 0,
    };
  }

  toggleSelection = () => {
    if (this.props.isActive) {
      this.props.removeFilter({ property: this.props.property });
      return;
    }
    this.addFilter();
  };

  addFilter = () => {
    const { upper, lower } = this.state;
    const type = 'between';
    this.props.updateFilter({
      type,
      min: lower,
      max: upper,
      property: this.props.property,
      isActive: true,
    });
  };

  updateSliderValues = ([lower, upper]: [number, number]) => {
    this.setState({
      lower: Math.round(lower * 100) / 100,
      upper: Math.round(upper * 100) / 100,
    });
  };

  displayValue = (val: number) => {
    const { toFixed } = this.props;
    if (typeof this.props.toFixed === 'number') {
      return (+val).toFixed(toFixed);
    }
    return val;
  };

  render() {
    const { step, min, max, filter, isActive } = this.props;
    const startingMin = typeof filter.min === 'number' ? filter.min : min;
    const startingMax = typeof filter.max === 'number' ? filter.max : max;
    return (
      <View>
        <ListItem onPress={ this.toggleSelection } style={ isActive ? styles.hideBorder : null }>
          <Body>
            <Text>{ keyDisplayMap[this.props.property] }</Text>
            { isActive ? (
              <Text>
                { `${this.displayValue(this.state.lower)} to ${this.displayValue(this.state.upper)}` }
              </Text>
            ) : null }
          </Body>
          <Switch value={ isActive } onSyncPress={ this.toggleSelection } />
        </ListItem>
        { this.props.isActive ? (
          <ListItem>
            <Body>
              <Grid>
                <Row style={ [styles.centerRow, styles.sliderRow] }>
                  <MultiSlider
                    trackStyle={styles.track}
                    min={ min }
                    max={ max }
                    step={ step }
                    values={ [startingMin, startingMax] }
                    onValuesChange={ this.updateSliderValues }
                    onValuesChangeFinish={ this.addFilter }
                    touchDimensions={{ height: 50, width: 50, borderRadius: 25, slipDisplacement: 50 }}
                  />
                </Row>
              </Grid>
            </Body>
          </ListItem>
        ) : null }
      </View>
    );
  }
}

const styles = {
  track: {
    height: 2.0,
  },
  centerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderRow: {
    marginTop: -17,
    marginBottom: 3,
  },
  hideBorder: {
    borderBottomWidth: 0,
  },
};
