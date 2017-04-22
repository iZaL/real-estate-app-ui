import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Root from '../Root';

test('renders Root Component', () => {
  const tree = renderer.create(<Root />).toJSON();
  expect(tree).toMatchSnapshot();
});
