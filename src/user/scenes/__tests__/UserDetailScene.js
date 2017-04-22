import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UserDetailScene from '../UserDetailScene';

test('renders heart', () => {
  const tree = renderer.create(<UserDetailScene user={{name: 'zal', email: 'z4ls@live.com'}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
