// @flow
import React from 'react';
import {
  Text,
  Container,
  Content,
  ListItem,
  CheckBox,
  Body,
} from 'native-base';

import GpaFilterContainer from '../containers/filter-items/GpaFilterContainer';

const Divider = ({ text }: { text: string }) => (
  <ListItem itemDivider style={styles.divider}>
    <Text>{ text }</Text>
  </ListItem>
);

type Props = {
  addFilter: Function,
  resetFilter: Function,
  addSorter: Function,
  resetSorter: Function,
  showActionSheetWithOptions: Function,
  navigation: { goBack: Function },
  filters: Array<Object>,
};

export default class FilterComponent extends React.Component {
  props: Props;
  static navigationOptions = ({ navigation }) => ({
    title: 'Filter By',
  });

  render() {
    return (
      <Container>
        <Content>
          <Divider text="Minimum Requirements" />
          <GpaFilterContainer
            property="minGpa"
          />
          <ListItem>
            <CheckBox />
            <Body>
              <Text>Patient Contact Hours</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox />
            <Body>
              <Text>GRE Required</Text>
            </Body>
          </ListItem>
          <Divider text="Program Features" />
          <ListItem>
            <CheckBox />
            <Body>
              <Text>Tuition</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox />
            <Body>
              <Text>Program Length</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox />
            <Body>
              <Text>Degree Offered</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox />
            <Body>
              <Text>Accreditation</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const styles = {
  divider: {
    backgroundColor: '#e0e3e6',
  },
};
