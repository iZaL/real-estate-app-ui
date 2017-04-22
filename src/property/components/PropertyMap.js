/*
 @flow
 */
import React, {Component, PropTypes} from 'react';
import {Dimensions, StyleSheet, TouchableHighlight, View} from 'react-native';
import MapView from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from './../../common/colors';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.8;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class PropertyMap extends Component {
  static propTypes = {
    onPinPress: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
    sceneType: PropTypes.string.isRequired,
    setSceneType: PropTypes.func.isRequired,
  };

  render() {
    const {address, onPinPress, sceneType, setSceneType} = this.props;
    const {latitude, longitude} = address;
    return (
      <View style={{flex: 1}}>

        {sceneType == 'mapScene' &&
          <TouchableHighlight style={styles.shrinkButton} onPress={() => setSceneType('detailScene')}>
            <FontAwesome name="arrows" size={25} color={colors.smokeGreyDark} />
          </TouchableHighlight>}

        <MapView
          ref={ref => {
            this.map = ref;
          }}
          provider={this.props.provider}
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {sceneType == 'mapScene'
            ? <MapView.Marker coordinate={address} onSelect={() => onPinPress()} scrollEnabled={true} />
            : <MapView.Marker coordinate={address} onSelect={() => setSceneType('mapScene')} scrollEnabled={false} />}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: 250,
    alignItems: 'center',
  },
  shrinkButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: 'white',
    zIndex: 1000,
    padding: 5,
  },
});
