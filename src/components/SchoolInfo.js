// @flow
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';

import keyDisplayMap from '../constants/keyDisplayMap';
import displayModifiers from '../constants/displayModifiers';

import Divider from './Divider';

export default class SchoolInfo extends React.Component {
  props: {
    school: Object,
  };
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: (
      <Icon
        size={ 33 }
        name="heart"
        type="evilicon"
        color="#517fa4"
        containerStyle={{ marginRight: 20 }}
        onPress={() => console.log('add favorite action here') }
      />
    )
  });
  renderInfo = () => {
    const { school } = this.props;
    const info = [];
    const {
      state,
      pance,
      accreditation,
      minGpa,
      minSGpa,
      healthcareHours,
      greRequired,
      misc,
      website,
      ...rest
    } = school;
    const addListItemFn = (key) => {
      if (school[key] && !(key === 'name')) {
        info.push(
          <ListItem key={ key }
            hideChevron
            title={ `${keyDisplayMap[key]}: ${displayModifiers[key](school[key])}` }
          />
        );
      }
    };
    // General info:
    info.push(
      <Divider title="School Info:" key="schoolinfo" />
    );
    ['state', 'pance', 'accreditation'].forEach(addListItemFn);
    // Minimum Requirements:
    info.push(
      <Divider title="Minimum Requirements:" key="requirements" />
    );
    ['minGpa', 'minSGpa', 'healthcareHours', 'greRequired'].forEach(addListItemFn);
    // Other Info:
    info.push(
      <Divider title="Other Info:" key="otherinfo" />
    );
    // Add any misc items
    Object.keys(rest).forEach((key) => addListItemFn(rest[key]));
    ['misc','website'].forEach(addListItemFn);
    info.push(
      <ListItem
        hideChevron
        key="empty"
        title="   "
      />
    );

    return info;
  };
  render() {
    const { school } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card
          containerStyle={{ flex: 1 }}
          dividerStyle={{ marginBottom: 0 }}
          title={ school.name }
        >
          <ScrollView>
            { this.renderInfo() }
          </ScrollView>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  standaloneRowBack: {
    backgroundColor: '#dee8f7',
  },
  foregroundRow: {
    backgroundColor: '#fff',
  },
  title: {
    width: 200
  },
  hiddenItem: {
    padding: 30
  }
});
