// @flow
import React from 'react';
import {
  View,
  Slider,
} from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  Footer,
  FooterTab,
  Body,
  CheckBox,
  ListItem,
  Row,
  Grid,
  Col,
} from 'native-base';
// import {
//   ActionSheetProvider,
//   connectActionSheet,
// } from '@expo/react-native-action-sheet';

// import filterOptions from '../constants/filterOptions';
// import keyDisplayMap from '../constants/keyDisplayMap';

// import FavoriteIconContainer from '../containers/FavoriteIconContainer';

type Props = {
  addFilter: Function,
  resetFilter: Function,
  addSorter: Function,
  resetSorter: Function,
  showActionSheetWithOptions: Function,
  navigation: { goBack: Function },
  filters: Array<Object>,
};

// export default class AddFilter extends React.Component {
//   render() {
//     return (
//       <ActionSheetProvider>
//         <FilterComponent { ...this.props } />
//       </ActionSheetProvider>
//     );
//   }
// }

// @connectActionSheet

class FilterItem extends React.Component {
  state = {
    open: false,
    upperBound: 4.0,
    lowerBound: 4.0,
  };

  toggleSelection = () => {
    this.setState({ open: !this.state.open });
  };

  setMin = (value: number) => {
    this.setState({ lowerBound: value });
  };

  setMax = (value: number) => {
    this.setState({ upperBound: value });
  };

  render() {
    console.log('logging state', this.state.lowerBound, typeof this.state.lowerBound);
    return (
      <View>
        <ListItem onPress={ this.toggleSelection } >
          <CheckBox checked={ this.state.open } onPress={ this.toggleSelection }  />
          <Body>
            <Text>Minimum Gpa</Text>
          </Body>
        </ListItem>
        { this.state.open ?
          (<ListItem>
            <Body>
              <Grid>
                <Row>
                  <Col>
                    <Slider
                      minimumValue={ 1.5 }
                      maximumValue={ 4.0 }
                      step={ 0.05 }
                      value={ this.state.lowerBound }
                      onValueChange={ this.setMin }
                    />
                  </Col>
                  <Col>
                    <Slider
                      minimumValue={ 1.5 }
                      maximumValue={ 4.0 }
                      step={ 0.05 }
                      value={ this.state.upperBound }
                      onValueChange={ this.setMax }
                    />
                  </Col>
                </Row>
                <Row>
                  <Text>
                    Min GPA between {this.state.lowerBound && this.state.lowerBound.toFixed(2)} and {this.state.upperBound && this.state.upperBound.toFixed(2)}
                  </Text>
                </Row>
              </Grid>
            </Body>
          </ListItem>) :
        null }
      </View>
    );
  }
}

export default class FilterComponent extends React.Component {
  props: Props;
  static navigationOptions = ({ navigation }) => ({
    title: 'Filter',
    // headerRight: (
    //   <FavoriteIconContainer name={ navigation.params.state.name } />
    // )
  });

  render() {
    return (
      <Container>
        <Content>
          <FilterItem />
        </Content>
        <Footer>
          <FooterTab>
            <Button
              // onPress={ this._openFilterActionSheet }
            >
              <Text>Add Filter</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
