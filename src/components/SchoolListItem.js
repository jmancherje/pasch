// @flow
import React from 'react';
// import { View } from 'react-native';
import { ListItem, Body, Text, Right, Left } from 'native-base';

import FavoriteIconContainer from '../containers/FavoriteIconContainer';

export default class SchoolListItem extends React.Component {
  props: {
    name: string,
    state: string,
    isFavorite: boolean,
    setSelection: Function,
    navigation: Object,
  };

  viewSchoolInfo = () => {
    const { setSelection, navigation, name } = this.props;
    setSelection({ name });
    navigation.navigate('SchoolInfo', { name });
  };

  render() {
    const { name, state, isFavorite } = this.props;
    return (
      <ListItem
        key={`${name}_${state}`}
        style={styles.listRow}
        onPress={ this.viewSchoolInfo.bind(this, {
          name: name,
          favorite: isFavorite,
        }) }
      >
        <Body>
          <Text>{ name }</Text>
          <Text note>{ state }</Text>
        </Body>
        <Right>
          <FavoriteIconContainer
            // size={ 20 }
            // style={styles.listRight}
            name={ name }
          />
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
  listBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  listLeft: {
    flex: 11,
    borderWidth: 1,
    borderColor: 'red',
  },
  listRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
  },
};
