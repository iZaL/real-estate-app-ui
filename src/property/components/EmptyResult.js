import React, {PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CountryPropType} from './../common/proptypes';
import colors from './../../common/colors';

const EmptyResult = props => {
  let {searchType, searchLocation, country} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        No properties found for
        {' '}
        {searchType}
        {' '}
        in
        {' '}
        {searchLocation ? searchLocation : country.fullName}
        {', '}
        matching your criteria
      </Text>
    </View>
  );
};

EmptyResult.propTypes = {
  country: CountryPropType.isRequired,
  searchType: PropTypes.string,
  searchLocation: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.smokeGreyLight,
  },
  title: {
    textAlign: 'center',
    color: colors.fadedBlack,
    fontWeight: '100',
    fontSize: 12,
  },
});

export default EmptyResult;
