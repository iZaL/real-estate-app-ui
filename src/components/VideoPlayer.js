/**
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {Dimensions, StyleSheet, TouchableHighlight, View} from 'react-native';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from './../common/colors';

export default class UploadVideo extends Component {
  static propTypes = {
    video: PropTypes.string.isRequired,
    style: View.propTypes.style,
  };

  state = {
    muted: false,
    paused: true,
  };

  togglePause = () => {
    this.setState({
      paused: !this.state.paused,
    });
  };

  render() {
    const {video, style, removeMedia} = this.props;
    const {muted, paused} = this.state;

    return (
      <View style={[styles.container, style]}>
        <TouchableHighlight
          onPress={() => removeMedia()}
          underlayColor="transparent"
          style={styles.removeButton}>
          <FontAwesome
            name="close"
            style={{
              backgroundColor: 'transparent',
            }}
            color="red"
            size={25}
          />

        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => this.togglePause()}>
          <View style={{flex: 1}}>
            <View
              style={{
                position: 'absolute',
                top: 75,
                zIndex: 1000,
                left: Dimensions.get('window').width / 2 - 40,
                opacity: 0.7,
                flex: 1,
                backgroundColor: 'black',
                width: 75,
                height: 75,
                borderRadius: 37.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome
                name={paused ? 'play' : 'pause'}
                color={colors.fadedWhite}
                size={37.5}
                style={{marginLeft: 5}}
              />
            </View>

            <Video
              source={{uri: video}}
              ref={ref => {
                this.player = ref;
              }}
              rate={1}
              volume={0.5}
              muted={muted}
              paused={paused}
              resizeMode="contain"
              repeat={false}
              style={styles.videoPlayer}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoPlayer: {
    width: Dimensions.get('window').width,
    height: 225,
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: 'black',
  },
  removeButton: {
    position: 'absolute',
    zIndex: 1000,
    left: -10,
    top: -8,
    backgroundColor: 'transparent',
  },
});
