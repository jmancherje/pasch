// @flow
import React from 'react';
import { Container, Content, Card, CardItem, Text } from 'native-base';

import FavoriteIconContainer from '../containers/FavoriteIconContainer';

import keyDisplayMap from '../constants/keyDisplayMap';
import displayModifiers from '../constants/displayModifiers';

export default class SchoolInfo extends React.Component {
  props: {
    school: Object,
  };
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: (
      <FavoriteIconContainer
        name={ navigation.state.params.name }
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
          <CardItem key={ key }
            hideChevron
            // title=
          >
            <Text>{ `${keyDisplayMap[key]}: ${displayModifiers[key](school[key])}` }</Text>
          </CardItem>
        );
      }
    };
    // General info:
    info.push(
      <CardItem key="schoolinfo" style={styles.divider}>
        <Text>School Info:</Text>
      </CardItem>
    );
    ['state', 'pance', 'accreditation'].forEach(addListItemFn);
    // Minimum Requirements:
    info.push(
      <CardItem key="requirements" style={styles.divider}>
        <Text>Minimum Requirements:</Text>
      </CardItem>
    );
    ['minGpa', 'minSGpa', 'healthcareHours', 'greRequired'].forEach(addListItemFn);
    // Other Info:
    info.push(
      <CardItem key="otherinfo" style={styles.divider}>
        <Text>Other Info:</Text>
      </CardItem>
    );
    // Add any misc items
    Object.keys(rest).forEach((key) => addListItemFn(rest[key]));
    ['misc','website'].forEach(addListItemFn);

    return info;
  };
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Card>
            { this.renderInfo() }
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = {
  divider: {
    backgroundColor: '#e0e3e6',
  },
  container: {
    padding: 5,
  }
};
