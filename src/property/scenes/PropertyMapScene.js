import React, {Component, PropTypes} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import MapView from 'react-native-maps';
import colors from './../../common/colors';
import PropertyIcons from './../components/PropertyIcons';
import moment from 'moment';
import {CountryPropType} from './../common/proptypes';

export default class PropertyMapScene extends Component {
  static propTypes = {
    onRegionChange: PropTypes.func,
    followLocation: PropTypes.func.isRequired,
    collection: PropTypes.array.isRequired,
    country: CountryPropType.isRequired,
  };

  render() {
    const {collection, loadScene, country} = this.props;
    const {width, height} = Dimensions.get('window');
    return (
      <MapView
        ref="map"
        style={styles.map}
        initialRegion={{
          latitude: country.coords.latitude,
          longitude: country.coords.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1 * width / height,
        }}>
        {collection.map(property => {
          return (
            <MapView.Marker
              ref={'ref' + property._id}
              key={'key' + property._id}
              coordinate={{
                latitude: parseFloat(property.address.latitude),
                longitude: parseFloat(property.address.longitude),
              }}
              pinColor="red">
              <MapView.Callout>
                <TouchableHighlight
                  style={styles.mapContainer}
                  onPress={() => loadScene(property)}
                  underlayColor="transparent">
                  <View style={styles.mapContent}>
                    <Image source={{uri: property.images[0]}} style={styles.image} resizeMode="contain" />
                    <View style={styles.rightCol}>
                      <Text style={styles.title}>{property.meta.title}</Text>
                      <Text style={styles.price}>
                        {property.meta.price}{country.currency}
                      </Text>
                      <PropertyIcons services={property.meta || []} items={['bedroom', 'bathroom', 'parking']} />
                      <Text style={styles.lightText}>
                        Added {moment(property.created_at).fromNow()}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'green',
    zIndex: 1000,
  },
  getDirectionText: {
    textDecorationLine: 'underline',
    paddingTop: 20,
    fontSize: 9,
  },
  companyName: {
    fontSize: 9,
    padding: 5,
    color: colors.smokeGreyDark,
    fontWeight: '400',
  },
  title: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '500',
  },
  image: {
    width: 100,
    height: 100,
  },
  mapContainer: {
    flex: 1,
    height: 100,
    alignItems: 'center',
  },
  mapContent: {
    flex: 1,
    flexDirection: 'row',
  },
  rightCol: {
    flexWrap: 'wrap',
    margin: 10,
  },
  lightText: {
    color: colors.fadedBlack,
    fontWeight: '100',
    fontSize: 12,
  },
  price: {
    color: colors.black,
    fontWeight: '500',
    fontSize: 16,
    paddingTop: 5,
  },
});
