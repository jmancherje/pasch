// @flow
import React from 'react';
import { View } from 'react-native';
import { ListItem, Body, Text } from 'native-base';

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
        <Body style={styles.listBody}>
          <View style={styles.listLeft}>
            <Text>{ name }</Text>
            <Text note>{ state }</Text>
          </View>
          <View style={styles.listRight}>
            <FavoriteIconContainer
              size={ 20 }
              name={ name }
            />
          </View>
        </Body>
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
  },
  listRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
