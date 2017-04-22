/** @flow */

import React, {Component, PropTypes} from 'react';
import {Dimensions, Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Gallery extends Component {
  static propTypes = {
    style: View.propTypes.style,
    images: PropTypes.array.isRequired,
    setSceneType: PropTypes.func.isRequired,
  };

  renderGallery = image => {
    return <Image source={{uri: image}} style={styles.cover} resizeMode="contain" />;
  };

  render() {
    const {images, sceneType, setSceneType} = this.props;
    return (
      <View style={styles.container}>
        {sceneType == 'galleryScene' &&
          <TouchableHighlight style={styles.shrinkButton} onPress={() => setSceneType('detailScene')}>
            <Ionicons name="ios-close" size={40} color="white" />
          </TouchableHighlight>}
        <Swiper style={[styles.gallery]} showsButtons buttonWrapperStyle={styles.navButtons}>
          {images.map((image, i) => {
            return (
              <View style={styles.album} key={i}>
                {this.renderGallery(image)}
              </View>
            );
          })}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
  },
  album: {
    backgroundColor: '#000',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
    },
  },
  cover: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
  label: {
    margin: 16,
    color: '#fff',
  },
  shrinkButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    zIndex: 1000,
  },
  navButtons: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
