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
  Segment,
  Button,
} from 'native-base';
import Switch from 'react-native-switch-pro';

import keyDisplayMap from '../constants/keyDisplayMap';

type Props = {
  // filter: Object,
  value: boolean,
  updateFilter: Function,
  removeFilter: Function,
  property: string,
  min: number,
  max: number,
  isActive: boolean,
  step: number,
  toFixed?: number,
};

export default class AddFilterRowBoolean extends React.Component {
  props: Props;

  toggleSelection = () => {
    if (this.props.isActive) {
      this.props.removeFilter({ property: this.props.property });
      return;
    }
    this.updateFilter();
  };

  updateFilter = (value?: boolean) => {
    const type = 'value';
    const newValue = typeof value === 'boolean' ? value : this.props.value;
    this.props.updateFilter({
      type,
      value: newValue,
      property: this.props.property,
      isActive: true,
    });
  };

  setTrue = () => {
    if (this.props.value) {
      return;
    }
    this.updateFilter(true);
  };

  setFalse = () => {
    if (!this.props.value) {
      return;
    }
    this.updateFilter(false);
  }

  render() {
    const { value, isActive } = this.props;
    return (
      <View>
        <ListItem style={ isActive ? styles.hideBorder : null }>
          <Body>
            <Text>{ keyDisplayMap[this.props.property] }</Text>
          </Body>
          <Switch value={ isActive } onSyncPress={ this.toggleSelection } />
        </ListItem>
        { this.props.isActive ? (
          <ListItem>
            <Body>
              <Grid>
                <Row style={ [styles.centerRow, styles.sliderRow] }>
                  <Segment style={ styles.segment }>
                    <Button first active={ value } onPress={ this.setTrue }>
                      <Text>Required</Text>
                    </Button>
                    <Button last active={ !value } onPress={ this.setFalse }>
                      <Text>Not Required</Text>
                    </Button>
                  </Segment>
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
  segment: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
};
