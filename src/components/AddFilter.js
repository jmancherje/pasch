// @flow
import React from 'react';
import {
  Button,
  Text,
  Container,
  Content,
  Footer,
  FooterTab,
} from 'native-base';

import GpaFilterContainer from '../containers/filter-items/GpaFilterContainer';

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
    title: 'Filter',
  });

  render() {
    return (
      <Container>
        <Content>
          <GpaFilterContainer
            property="minGpa"
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <Text>Add Filter</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
