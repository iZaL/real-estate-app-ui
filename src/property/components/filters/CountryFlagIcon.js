/**
 * @flow
 */
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import CountryFlags from './../../../common/flag';
import {CountryPropType} from './../../common/proptypes';

const CountryFlagIcon = ({country}) => {
  let countryFlag = CountryFlags[country.abbr];
  return <Image source={countryFlag} style={styles.container} resizeMode="contain" />;
};

CountryFlagIcon.propTypes = {
  country: CountryPropType.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
  },
});

export default CountryFlagIcon;
