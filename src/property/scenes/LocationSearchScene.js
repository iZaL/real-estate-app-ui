import React, {Component, PropTypes} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../common/colors';
import {GOOGLE_MAPS_KEY} from '../../env.js';
import {
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import NavBar from './../../components/NavBar';
import NavButton from './../../components/NavButton';
import Separator from './../../components/Separator';
import {CountryPropType} from './../../property/common/proptypes';

export default class LocationSearchScene extends Component {
  static propTypes = {
    searchString: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    country: CountryPropType.isRequired,
    onLeftButtonPress: PropTypes.func,
    onRightButtonPress: PropTypes.func,
  };

  render() {
    const {
      onSearch,
      searchString,
      country,
      onRightButtonPress,
      onLeftButtonPress,
    } = this.props;
    return (
      <View style={{flex: 1}}>
        <NavBar
          right={
            <NavButton
              title="Done"
              onPress={() => onRightButtonPress(this.googlePlaces)}
              style={{paddingLeft: 10}}
            />
          }
          middle={
            <Text style={{fontWeight: '500', fontSize: 17}}>
              {' '}Search Location{' '}
            </Text>
          }
          left={
            <NavButton
              icon="ios-arrow-back"
              style={{width: 33, height: 33, marginLeft: -5}}
              iconSize={33}
              onPress={() => onLeftButtonPress()}
            />
          }
        />

        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          <View style={{flex: 1}}>
            <View style={styles.wrapper}>

              <Ionicons
                name="ios-search"
                size={18}
                color={colors.darkGrey}
                style={styles.icon}
              />
              <GooglePlacesAutocomplete
                placeholder="Search"
                minLength={3}
                autoFocus={true}
                fetchDetails={false}
                renderDescription={row => row.terms[0].value}
                onPress={row => onSearch(row.terms[0].value)}
                listUnderlayColor={colors.lightGrey}
                getDefaultValue={() => searchString}
                query={{
                  key: GOOGLE_MAPS_KEY,
                  language: 'en',
                  types: '(regions)',
                  components: `country:${country.abbr}`,
                }}
                styles={autoCompleteStyle}
                enablePoweredByContainer={false}
                placeholderTextColor={colors.lightGrey}
                ref={ref => {
                  this.googlePlaces = ref;
                }}
              />
            </View>
            <Separator style={{marginTop: 10, marginBottom: 10}} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 15,
    paddingLeft: 5,
  },
  icon: {
    padding: 5,
    paddingTop: 11,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    color: colors.darkGrey,
    fontSize: 17,
    fontWeight: '500',
    height: 40,
  },
});

const autoCompleteStyle = {
  textInputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    margin: 0,
    height: 40,
  },
  textInput: {
    color: colors.darkGrey,
    fontSize: 16,
    fontWeight: '400',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
};
