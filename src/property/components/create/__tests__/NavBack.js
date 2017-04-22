import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavBack from './../NavBack';

test('renders NavBack', () => {
  const tree = renderer.create(<NavBack />).toJSON();
  expect(tree).toMatchSnapshot();
});
