import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LoadingIndicator from './../LoadingIndicator';

const emitter = {
  emit: jest.fn().mockReturnThis(),
};

test('renders null', () => {
  const tree = renderer.create(<LoadingIndicator />).toJSON();
  expect(tree).toMatchSnapshot();
});
