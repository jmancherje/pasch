import React from 'react';

import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

const Heart = ({ filled, style, ...props }: { filled: boolean, style: Object }) => {
  const centerNonFilled = (
    <View style={[StyleSheet.absoluteFill, styles.fit]}>
      <View style={[styles.leftHeart, styles.heartShape, styles.emptyFill]} />
      <View style={[styles.rightHeart, styles.heartShape, styles.emptyFill]} />
    </View>
  );
  const fillStyle = filled ? styles.filledHeart : styles.empty;
  return (
    <Animated.View { ...props } style={[styles.heart, style]}>
      <View style={[styles.leftHeart, styles.heartShape, fillStyle]} />
      <View style={[styles.rightHeart, styles.heartShape, fillStyle]} />
      { !filled && centerNonFilled }
    </Animated.View>
  );
};

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
