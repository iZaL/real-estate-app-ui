/**
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../../common/colors';
import ImagePicker from 'react-native-image-crop-picker';
import VideoPlayer from './../../../components/VideoPlayer';

export default class UploadVideo extends Component {
  static propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    video: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
  };

  pickVideo = () => {
    const {onFieldChange} = this.props;
    ImagePicker.openPicker({
      smartAlbums: ['Videos'],
    }).then(media => {
      onFieldChange('video', media.path);
    });
  };

  removeVideo = video => {
    const {onFieldChange} = this.props;
    onFieldChange('video', null);
  };

  render() {
    const {header, footer, video} = this.props;

    return (
      <View style={styles.container}>

        {header}

        <TouchableHighlight
          style={styles.cameraIcon}
          onPress={() => this.pickVideo()}
          underlayColor="transparent">
          <FontAwesome name="video-camera" size={100} color={colors.white} />
        </TouchableHighlight>

        <View style={styles.menuContainer}>
          {video &&
            <VideoPlayer video={video} removeMedia={this.removeVideo} />}
        </View>

        {footer}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.smokeGreyLight,
  },
  contentContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuContainer: {
    flex: 3,
    padding: 10,
    backgroundColor: 'white',
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 150,
    height: 150,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#CCC',
  },
  cameraIcon: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  image: {
    width: 125,
    height: 125,
  },
  video: {
    flex: 1,
    height: 200,
    width: 300,
  },
});
