// @flow
import React from 'react';
import { connect } from 'react-redux';

import { toggleFavorite } from '../actions';
import { Icon } from 'react-native-elements';

class FavoriteIcon extends React.Component {
  props: {
    name: string,
    isFavorite: boolean,
    toggleFavorite: Function,
    size?: number,
  };

  toggleFavorite = () => {
    this.props.toggleFavorite({ name: this.props.name });
  };

  render() {
    const { isFavorite, size = 18 } = this.props;
    return (
      <Icon
        size={ size }
        name={ isFavorite ? 'heart' : 'heart-o' }
        type="font-awesome"
        color="#517fa4"
        containerStyle={{ marginRight: 20 }}
        onPress={ this.toggleFavorite }
      />
    );
  }
}

const mapStateToProps = (state, { name }) => ({
  isFavorite: state.favorites[name],
});

export default connect(mapStateToProps, {
  toggleFavorite
})(FavoriteIcon);
