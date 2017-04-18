// @flow
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

type Props = {
  filter: Array<Object>,
  setFilter: Function,
  resetFilter: Function,
  setSorter: Function,
  resetSorter: Function,
  navigation: { goBack: Function },
};

export default class Filter extends React.Component {
  props: Props;
  static navigationOptions = {
    title: 'Filter',
  };

  reset = () => {
    this.props.resetFilter();
    this.props.resetSorter();
    this.props.navigation.goBack();
  }

  render() {
    const { goBack } = this.props.navigation;
    const { setFilter } = this.props;
    return (
      <View>
        <Button
          buttonStyle={{ marginTop: 15 }}
          title="Sort By State"
          onPress={() => {
            setFilter('state');
            goBack();
          }}
        />
        <Button
          buttonStyle={{ marginTop: 15 }}
          title="Sort By Name"
          onPress={() => {
            setFilter('name');
            goBack();
          }}
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
