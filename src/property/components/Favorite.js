import React, {Component, PropTypes} from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Favorite extends Component {
  static propTypes = {
    handleFavoritePress: PropTypes.func.isRequired,
    isFavorited: PropTypes.bool.isRequired,
  };

  render() {
    const {handleFavoritePress, isFavorited} = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {
            handleFavoritePress();
          }}
          underlayColor="transparent">
          <FontAwesome name={isFavorited ? 'star' : 'star-o'} size={25} style={[styles.icon]} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 15,
    paddingLeft: 5,
  },
  icon: {
    width: 25,
    height: 25,
    color: 'gold',
  },
});
