import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Separator from './../Separator';

const navigator = {
  pop: jest.fn(),
};

test('renders null', () => {
  const tree = renderer.create(<Separator />).toJSON();
  expect(tree).toMatchSnapshot();
});
