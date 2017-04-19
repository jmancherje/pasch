// @flow
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';

import filterOptions from '../constants/filterOptions';

type Props = {
  addFilter: Function,
  resetFilter: Function,
  addSorter: Function,
  resetSorter: Function,
  showActionSheetWithOptions: Function,
  navigation: { goBack: Function },
};

export default class Filter extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <FilterComponent { ...this.props } />
      </ActionSheetProvider>
    );
  }
}

@connectActionSheet
class FilterComponent extends React.Component {
  props: Props;
  static navigationOptions = {
    title: 'Filter',
  };
  state = {
    property: '',
    modifiers: [],
  };

  _addFilter = () => {
    console.log('state at the beginning');
    const { property, modifiers } = this.state;
    const filter = { property };
    if (modifiers[0] === 'above' || modifiers[0] === 'below') {
      const value = +modifiers[1];
      if (modifiers[0] === 'above') {
        filter.min = value;
        filter.type = 'above';
      } else {
        filter.max = value;
        filter.type = 'below';
      }
    } else {
      filter.value = modifiers[0];
      filter.type = 'value';
    }
    console.log('filter', filter);
    this.props.addFilter(filter);
  };

  _openSetValueSelector = () => {
    const { property } = this.state;
    if (property !== 'state' && property !== 'accreditation') {
      return;
    }
    const options = [...filterOptions[property], 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      btnIndex => {
        this.setState({ modifiers: [...this.state.modifiers, options[btnIndex]] });
        this._addFilter();
      }
    );
  };

  _openGpaSelector = () => {
    const options = [...filterOptions.minGpa, 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      btnIndex => {
        this.setState({ modifiers: [...this.state.modifiers, options[btnIndex]] });
        this._addFilter();
      }
    );
  };

  _openAboveBelowSelector = () => {
    const options = ['above', 'below', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      btnIndex => {
        this.setState({ modifiers: [...this.state.modifiers, options[btnIndex]] });
        switch (this.state.property) {
          case 'minGpa':
          case 'averageGpa':
            this._openGpaSelector();
            break;
          case 'workHours':
            console.log('workHours');
            break;
        }
      }
    );
  };

  _openFilterActionSheet = () => {
    this.setState({
      property: '',
      modifiers: [],
    });
    let options = ['state', 'minGpa', 'workHours', 'accreditation','Cancel'];
    let cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      btnIndex => {
        this.setState({ property: options[btnIndex] });
        switch (options[btnIndex]) {
          case 'state':
            this._openSetValueSelector();
            break;
          case 'workHours':
          case 'minGpa':
          case 'averageGpa':
            this._openAboveBelowSelector();
            break;
        }
        if (btnIndex === 0) {
        }
      }
    );
  };

  // _openSortByActionSheet = () => {
  //   let options = []
  // };

  reset = () => {
    this.props.resetFilter();
    this.props.resetSorter();
    this.props.navigation.goBack();
  };



  render() {
    // const { goBack } = this.props.navigation;
    // const { addFilter } = this.props;
    return (
      <View>
        <Button
          buttonStyle={{ marginTop: 15 }}
          title="Filter Schools"
          onPress={ this._openFilterActionSheet }
        />
        <Button
          buttonStyle={{ marginTop: 15 }}
          title="Sort By"
          onPress={ this._openFilterActionSheet }
        />
        <Button
          buttonStyle={{ marginTop: 15 }}
          title="RESET"
          onPress={ this.reset }
        />
      </View>
    );
  }
}
