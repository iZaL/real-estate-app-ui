import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavButton from './../NavButton';

test('renders null', () => {
  const tree = renderer.create(<NavButton onPress={() => {}} text="title" />).toJSON();
  expect(tree).toMatchSnapshot();
});
