import React from 'react';

import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

class Heart extends React.Component {
  props: {
    filled: boolean,
    style: Object,
    toggleFavorite: Function,
    name: string,
  };

  state = {
    // liked: false,
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
    this.props.toggleFavorite({ name: this.props.name });
    Animated.spring(this.state.scale, {
      toValue: 2,
      friction: 3
    }).start(() => {
      this.state.scale.setValue(0);
    });
  };

  render() {
    const { filled, style, ...props } = this.props;
    const centerNonFilled = (
      <View style={[StyleSheet.absoluteFill, styles.fit]}>
        <View style={[styles.leftHeart, styles.heartShape, styles.emptyFill]} />
        <View style={[styles.rightHeart, styles.heartShape, styles.emptyFill]} />
      </View>
    );
    const fillStyle = filled ? styles.filledHeart : styles.empty;
    const bouncyHeart = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.8, 1],
    });
    const heartButtonStyle = {
      transform: [
        { scale: bouncyHeart }
      ]
    };
          // <FavoriteIconContainer name={ this.props.name } />
    return (
      <TouchableWithoutFeedback onPress={ this.triggerLike }>
        <Animated.View style={ heartButtonStyle }>
          <Animated.View { ...props } style={[styles.heart, style]}>
            <View style={[styles.leftHeart, styles.heartShape, fillStyle]} />
            <View style={[styles.rightHeart, styles.heartShape, fillStyle]} />
            { !filled && centerNonFilled }
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  heart: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  heartShape: {
    width: 16,
    height: 25,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  filledHeart: {
    backgroundColor: '#e31745',
  },
  fit: {
    transform: [
      { scale: 0.9 }
    ]
  },
  emptyFill: {
    backgroundColor: '#FFF',
  },
  empty: {
    backgroundColor: '#ccc',
  },
  leftHeart: {
    transform: [
      { rotate: '-45deg' }
    ],
    left: 5,
  },
  rightHeart: {
    transform: [
      { rotate: '45deg' },
    ],
    right: 5,
  }
});

export default Heart;
