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

import AddFilterRowNumericContainer from '../containers/AddFilterRowNumericContainer';
import AddFilterRowBooleanContainer from '../containers/AddFilterRowBooleanContainer';

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
          <AddFilterRowNumericContainer
            property="minGpa"
            min={ 0 }
            max={ 4.0 }
            step={ 0.05 }
            toFixed={ 2 }
          />
          <AddFilterRowNumericContainer
            property="minSGpa"
            min={ 0 }
            max={ 4.0 }
            step={ 0.05 }
            toFixed={ 2 }
          />
          <AddFilterRowNumericContainer
            property="healthcareHours"
            min={ 0 }
            max={ 5000 }
            step={ 100 }
          />
          <AddFilterRowBooleanContainer
            property="greRequired"
          />
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
