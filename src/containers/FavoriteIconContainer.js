// @flow
import React from 'react';
import { connect } from 'react-redux';

import { toggleFavorite } from '../actions';
// import { Icon } from 'react-native-elements';
import { Button, Icon } from 'native-base';

class FavoriteIcon extends React.Component {
  props: {
    name: string,
    isFavorite: boolean,
    toggleFavorite: Function,
    size?: number,
    style?: Object,
  };

  toggleFavorite = () => {
    this.props.toggleFavorite({ name: this.props.name });
  };

  render() {
    const { isFavorite, size = 18 } = this.props;
    return (
      <Button
        transparent
        onPress={ this.toggleFavorite }
      >
        <Icon
          name="heart"
          active={ isFavorite }
          style={{ color: isFavorite ? '#e31745' : 'grey', fontSize: size }}
        />
      </Button>
    );
  }
}

const mapStateToProps = (state, { name }) => ({
  isFavorite: state.favorites[name],
});

export default connect(mapStateToProps, {
  toggleFavorite
})(FavoriteIcon);
