import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from './../common/colors';

const Separator = ({style}) => <View style={[styles.container, style]} />;

Separator.propTyes = {
  style: View.propTypes.style,
};

const styles = StyleSheet.create({
  container: {
    height: 0.5,
    backgroundColor: colors.smokeGreyLight,
  },
});

export default Separator;
