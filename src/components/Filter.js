import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

export default class Filter extends React.Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  };
  static navigationOptions = {
    title: "Filter",
  };
  render() {
    const { navigate } = this.props.navigation;
    const {
      setFilter,
      resetFilter,
    } = this.props;
    return (
      <View>
        <Button
          buttonStyle={{ marginTop: 15 }}
          title="Sort By State"
          onPress={() => {
            setFilter('state');
            navigate('SchoolList');
          }}
        />
        <Button
          buttonStyle={{ marginTop: 15 }}
          title="Sort By Name"
          onPress={() => {
            setFilter('name');
            navigate('SchoolList');
          }}
        />
      </View>
    );
  }
}