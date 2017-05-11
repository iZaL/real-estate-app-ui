/**
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../common/colors';
import Footer from './Footer';
import MapView from 'react-native-maps';
import {
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_KEY} from './../../../env.js';
import isEmpty from 'lodash/isEmpty';
import {CountryPropType} from './../../common/proptypes';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.7;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class AddressPicker extends Component {
  static propTypes = {
    country: CountryPropType.isRequired,
    updateAddress: PropTypes.func.isRequired,
    updateListing: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
  };
  jumpToRegion = () => {
    this.map.animateToRegion(this.mapMarkerRegion());
  };

  onSearchPress = (locationData, locationDetails) => {
    const {updateAddress} = this.props;
    let city, state, country;
    if (locationData.terms[2]) {
      city = locationData.terms[0].value;
      state = locationData.terms[1].value;
      country = locationData.terms[2].value;
    } else if (!locationData.terms[1]) {
      // if country :Kuwait,
      city = locationData.terms[0].value;
      state = locationData.terms[0].value;
      country = locationData.terms[0].value;
    } else {
      city = locationData.terms[0].value;
      state = locationData.terms[0].value;
      country = locationData.terms[1].value;
    }

    updateAddress({
      latitude: locationDetails.geometry.location.lat,
      longitude: locationDetails.geometry.location.lng,
      city: city,
      state: state,
      country: country,
    });
    this.jumpToRegion();
  };

  onDragEnd = e => {
    const {address, updateAddress} = this.props;
    updateAddress({
      ...address,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });

    this.jumpToRegion();
  };

  updateListing = () => {
    const {address, updateListing} = this.props;
    if (isEmpty(address.country)) {
      return Alert.alert('Please Select Your Area', null);
    }
    return updateListing();
  };

  mapMarkerRegion = () => {
    const {address, country} = this.props;
    let {coords} = country;

    let latitude, longitude;

    if (address.latitude && address.latitude % 1 !== 0) {
      latitude = address.latitude;
      longitude = address.longitude;
    } else {
      latitude = coords.latitude;
      longitude = coords.longitude;
    }

    return {
      latitude: latitude,
      longitude: longitude,
    };
  };

  render() {
    const {header, country, address} = this.props;
    const {latitude, longitude} = this.mapMarkerRegion();
    return (
      <View style={styles.container}>
        {header}

        <View style={styles.searchInputContainer}>
          <GooglePlacesAutocomplete
            placeholder="Select your area"
            minLength={3}
            fetchDetails={true}
            renderDescription={row => row.terms[0].value}
            onPress={(data, details = null) => {
              this.onSearchPress(data, details);
            }}
            query={{
              key: GOOGLE_MAPS_KEY,
              language: 'en',
              types: '(regions)',
              components: `country:${country.abbr}`,
            }}
            styles={autoCompleteStyle}
            enablePoweredByContainer={false}
            placeholderTextColor={colors.lightGrey}
            getDefaultValue={() => address.city}
          />

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.jumpToRegion()}
            style={styles.textInput}>
            <Ionicons
              name="ios-paper-plane"
              color={colors.smokeGreyDark}
              size={25}
              style={{
                width: 25,
                height: 25,
                margin: 8,
              }}
            />

          </TouchableHighlight>
        </View>

        <View style={styles.menuContainer}>

          <View style={styles.mapContainer}>

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
              }}
              onRegionChange={this.onRegionChange}>

              <MapView.Marker
                coordinate={this.mapMarkerRegion()}
                onDragEnd={e => this.onDragEnd(e)}
                draggable
              />

            </MapView>
          </View>
        </View>

        <Footer updateListing={() => this.updateListing()} />

      </View>
    );
  }
}

const autoCompleteStyle = {
  textInputContainer: {
    margin: 0,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: 70000,
  },
  textInput: {
    color: colors.darkGrey,
    fontSize: 16,
    fontWeight: '400',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  description: {},
  row: {
    backgroundColor: 'white',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.smokeGreyLight,
  },
  menuContainer: {
    flex: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  searchInputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    zIndex: 5000,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textInput: {
    backgroundColor: 'white',
  },
  textInputWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
});
