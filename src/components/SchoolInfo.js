// @flow
import React from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Right,
} from 'native-base';

import FavoriteIconContainer from '../containers/FavoriteIconContainer';

import keyDisplayMap from '../constants/keyDisplayMap';
import displayModifiers from '../constants/displayModifiers';

const keys = {
  generalSchoolInfo: ['state', 'pance_1', 'pance_5', 'accreditation'],
  minimumRequirements: ['minGpa', 'minGpaRecommended', 'minSGpa', 'minSGpaRecommended','healthcareHours', 'healthcareHoursRecommended', 'greRequired'],
  misc: ['misc', 'website'],
};

export default class SchoolInfo extends React.Component {
  props: {
    school: Object,
  };
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name,
    headerTitleStyle: {
      color: '#312e4e'
    },
    headerRight: (
      <FavoriteIconContainer
        name={ navigation.state.params.name }
      />
    )
  });
  renderInfo = () => {
    const { school } = this.props;
    const info = [];
    const addListItemFn = (key) => {
      if (school[key]) {
        if (keys.misc.includes(key) || key === 'name') {
          info.push(
            <CardItem key={ key } style={ styles.cardItem } hideChevron>
              <Text>{ `${keyDisplayMap[key]}: ${displayModifiers[key](school[key])}` }</Text>
            </CardItem>
          );
          return;
        }
        info.push(
          <CardItem key={ key } style={ styles.cardItem } hideChevron>
            <Body>
              <Text>{ `${keyDisplayMap[key]}:` }</Text>
            </Body>
            <Right>
              <Text>{  `${displayModifiers[key](school[key])}` }</Text>
            </Right>
          </CardItem>
        );
      }
    };
    // General info:
    info.push(
      <CardItem key="name" style={ styles.divider } hideChevron>
        <Text>{ school.name }</Text>
      </CardItem>
    );
    keys.generalSchoolInfo.forEach((property) => addListItemFn(property));
    // Minimum Requirements:
    info.push(
      <CardItem key="requirements" style={styles.divider}>
        <Text>Minimum Requirements:</Text>
      </CardItem>
    );
    keys.minimumRequirements.forEach(addListItemFn);
    // Other Info:
    info.push(
      <CardItem key="otherinfo" style={styles.divider}>
        <Text>Other Info:</Text>
      </CardItem>
    );
    // Add any misc items
    keys.misc.forEach((property) => addListItemFn(property));

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
  },
  cardItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
};
