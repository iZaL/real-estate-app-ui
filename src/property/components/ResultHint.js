import React, {PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CountryPropType} from './../common/proptypes';
import colors from './../../common/colors';

const ResultHint = props => {
  let {searchType, searchLocation, country, isFetching} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isFetching && 'Fetching '}
        Properties
        {' '}
        {searchType}
        {' '}
        in
        {' '}
        {searchLocation ? searchLocation : country.fullName}
      </Text>
    </View>
  );
};

ResultHint.propTypes = {
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

export default ResultHint;
