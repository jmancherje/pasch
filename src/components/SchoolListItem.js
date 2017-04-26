// @flow
import React from 'react';
// import { Dimensions } from 'react-native';
import {
  ListItem,
  Body,
  Text,
  Right,
} from 'native-base';
import { Icon } from 'react-native-elements';
// const { width } = Dimensions.get('window');

import FavoriteIconContainer from '../containers/FavoriteIconContainer';

export default class SchoolListItem extends React.Component {
  props: {
    name: string,
    state: string,
    navigation: Object,
    isFavorite: boolean,
    setSelection: Function,
    hideFavoriteIcon: boolean,
  };

  viewSchoolInfo = () => {
    const { setSelection, navigation, name } = this.props;
    setSelection({ name });
    navigation.navigate('SchoolInfo', { name });
  };

  render() {
    const { name, state, hideFavoriteIcon } = this.props;
    return (
      <ListItem
        key={`${name}_${state}`}
        style={styles.listRow}
        onPress={ this.viewSchoolInfo }
      >
        { /* TODO: get avatars for schools <Left style={styles.left}>
          <Icon
            name="chevron-right"
          />
        </Left>*/ }
        <Body style={styles.body}>
          <Text>{ name }</Text>
          <Text note>{ state }</Text>
        </Body>
        <Right style={styles.right}>
          { !hideFavoriteIcon ?
            (<FavoriteIconContainer name={ this.props.name } />) :
            (<Icon
              name="chevron-right"
            />)
          }
        </Right>
      </ListItem>
    );
  }
}

const styles = {
  listRow: {
    backgroundColor: '#fff',
    paddingRight: 0,
    marginLeft: 0,
  },
  left: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'green',
  },
  body: {
    flex: 11,
    // width: (width * 0.83),
    // borderWidth: 1,
    // borderColor: 'red',
  },
  right: {
    flex: 2,
    // width: (width * 0.17),
    // borderWidth: 1,
    // borderColor: 'blue',
  }
};
