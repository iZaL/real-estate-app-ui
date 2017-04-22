import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import colors from './../common/colors';

const LoadingIndicator = ({style}) => (
  <ActivityIndicator size="small" animating color={colors.accent} style={{paddingVertical: 20}} />
);

LoadingIndicator.propTypes = {
  style: View.propTypes.style,
};

export default LoadingIndicator;
