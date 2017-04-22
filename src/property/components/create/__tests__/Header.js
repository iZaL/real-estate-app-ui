import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Header from './../Header';

test('renders Header', () => {
  const tree = renderer.create(<Header title="the title" />).toJSON();
  expect(tree).toMatchSnapshot();
});
