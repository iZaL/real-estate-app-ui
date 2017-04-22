import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PropertyIcons from './../PropertyIcons';

test('renders heart', () => {
  const tree = renderer.create(<PropertyIcons services={{bedroom: '1', bathroom: '2'}} items={['bedroom']} />).toJSON();
  expect(tree).toMatchSnapshot();
});
