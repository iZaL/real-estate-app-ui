import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import Root from './src/Root';

StatusBar.setBarStyle('dark-content');
console.disableYellowBox = true;

AppRegistry.registerComponent('property', () => Root);
