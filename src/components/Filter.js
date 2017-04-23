// @flow
import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import {
  Button,
  Text,
  Container,
  Content,
  Footer,
  FooterTab,
} from 'native-base';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';

import filterOptions from '../constants/filterOptions';
import keyDisplayMap from '../constants/keyDisplayMap';

type Props = {
  addFilter: Function,
  resetFilter: Function,
  addSorter: Function,
  resetSorter: Function,
  showActionSheetWithOptions: Function,
  navigation: { goBack: Function },
  filters: Array<Object>,
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
  static navigationOptions = () => ({
    title: 'Filter',
    headerRight: (
      <Button
        small
        style={{ marginRight: 10 }}
      >
        <Text>Clear All</Text>
      </Button>
    )
  });
  state = {
    property: '',
    modifiers: [],
  };

  _addFilter = () => {
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
        if (btnIndex === cancelButtonIndex) {
          return;
        }
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
        if (btnIndex === cancelButtonIndex) {
          return;
        }
        this.setState({ modifiers: [...this.state.modifiers, options[btnIndex]] });
        this._addFilter();
      }
    );
  };

  _openWorkHoursSelector = () => {
    const options = [...filterOptions.healthcareHours, 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      btnIndex => {
        if (btnIndex === cancelButtonIndex) {
          return;
        }
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
        if (btnIndex === cancelButtonIndex) {
          return;
        }
        this.setState({ modifiers: [...this.state.modifiers, options[btnIndex]] });
        switch (this.state.property) {
          case 'minGpa':
          case 'minSGpa':
            this._openGpaSelector();
            break;
          case 'healthcareHours':
            this._openWorkHoursSelector();
            break;
          case 'pance':
            this._openPanceSelector();
            break;
        }
      }
    );
  };

  _openPanceSelector = () => {
    const options = [...filterOptions.pance, 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      btnIndex => {
        if (btnIndex === cancelButtonIndex) {
          return;
        }
        this.setState({ modifiers: [...this.state.modifiers, options[btnIndex]] });
        this._addFilter();
      }
    );
  };

  _openFilterActionSheet = () => {
    // Reset state
    this.setState({
      property: '',
      modifiers: [],
    });
    const options = [
      ...Object.keys(filterOptions).map(property => keyDisplayMap[property]),
      'Cancel'
    ];
    const cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      btnIndex => {
        if (btnIndex === cancelButtonIndex) {
          return;
        }
        this.setState({ property: options[btnIndex] });
        switch (options[btnIndex]) {
          case 'state':
          case 'greRequired':
          case 'accreditation':
            this._openSetValueSelector();
            break;
          case 'healthcareHours':
          case 'minGpa':
          case 'minSGpa':
          case 'pance':
            this._openAboveBelowSelector();
            break;
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
  };

  _getFilterTitle(filter: Object) {
    switch (filter.type) {
      case 'above':
      case 'below':
        return `${filter.property} ${filter.type} ${filter.min || filter.max}`;
      case 'value':
        return `${filter.property}: ${filter.value}`;
    }
  }

  render() {
    return (
      <Container>
        <Content>
          { this.props.filters.map(filter =>
            <ListItem
              key={ `${filter.property}_${filter.value || filter.min || filter.max}` }
              title={ this._getFilterTitle(filter) }
              hideChevron
              component={ View }
              containerStyle={{ backgroundColor: '#e0e3e6'}}
            />
          ) }
        </Content>
        <Footer>
          <FooterTab>
            <Button
               // active
              // info
              // style={{ marginTop: 15 }}
              onPress={ this._openFilterActionSheet }
            >
              <Text>Add Filter</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
