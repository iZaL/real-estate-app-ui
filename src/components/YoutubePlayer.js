/**
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import Youtube from 'react-native-youtube';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from './../common/colors';

export default class YoutubePlayer extends Component {
  static propTypes = {
    video: PropTypes.string.isRequired,
    style: View.propTypes.style,
  };

  state = {
    playerVisible: false,
  };

  onThumbnailPress = () => {
    return this.setState({
      playerVisible: true,
    });
  };

  hidePlayer = () => {
    this.setState({
      playerVisible: false,
    });
  };

  render() {
    const {video, style} = this.props;
    const {playerVisible} = this.state;
    const imageThumbnail = `https://img.youtube.com/vi/${video}/hqdefault.jpg`;
    return (
      <View style={[styles.container, style]}>
        {playerVisible
          ? <Youtube
              ref="youtubePlayer"
              videoId={video} // The YouTube video ID
              play={true} // control playback of video with true/false
              hidden={true} // control visiblity of the entire view
              playsInline={false} // control whether the video should play inline
              loop={false} // control whether the video should loop when ended
              style={{
                height: 250,
                width: Dimensions.get('window').width,
                backgroundColor: 'white',
                marginVertical: 10,
              }}
              rel={false}
              modestbrand={false}
              showinfo={true}
              controls={0}
              onFullScreenExit={() => {
                this.hidePlayer();
              }}
            />
          : <TouchableHighlight
              onPress={() => this.onThumbnailPress()}
              underlayColor="transparent">
              <View style={{flex: 1}}>
                <View
                  style={{
                    position: 'absolute',
                    top: 100,
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
                    name="play"
                    color={colors.fadedWhite}
                    size={37.5}
                    style={{marginLeft: 5}}
                  />
                </View>
                <Image
                  source={{uri: imageThumbnail}}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </View>
            </TouchableHighlight>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  videoPlayer: {
    width: 225,
    height: 225,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  removeButton: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'transparent',
    marginLeft: 55,
  },
  thumbnailImage: {
    width: Dimensions.get('window').width,
    height: 250,
    backgroundColor: 'black',
  },
});
