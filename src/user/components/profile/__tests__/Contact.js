import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Contact from './../Contact';

test('renders heart', () => {
  const tree = renderer.create(<Contact user={{name: 'name', email: 'z4ls@live.com'}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
