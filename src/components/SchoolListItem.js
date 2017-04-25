// @flow
import React from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { ListItem, Body, Text, Right } from 'native-base';

// import FavoriteIconContainer from '../containers/FavoriteIconContainer';
import Heart from './Heart';

export default class SchoolListItem extends React.Component {
  props: {
    name: string,
    state: string,
    isFavorite: boolean,
    setSelection: Function,
    navigation: Object,
  };

  state = {
    liked: false,
    scale: new Animated.Value(0),
    animations: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ]
  };

  triggerLike = () => {
    this.setState({
      liked: !this.state.liked,
    });
    Animated.spring(this.state.scale, {
      toValue: 2,
      friction: 3
    }).start(() => {
      this.state.scale.setValue(0);
    });
  };

  viewSchoolInfo = () => {
    const { setSelection, navigation, name } = this.props;
    setSelection({ name });
    navigation.navigate('SchoolInfo', { name });
  };

  render() {
    const { name, state, isFavorite } = this.props;
    const bouncyHeart = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.8, 1],
    });
    const heartButtonStyle = {
      transform: [
        { scale: bouncyHeart }
      ]
    };
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
          <TouchableWithoutFeedback onPress={ this.triggerLike }>
            <Animated.View style={ heartButtonStyle }>
              <Heart filled={ this.state.liked } />
            </Animated.View>
          </TouchableWithoutFeedback>
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
