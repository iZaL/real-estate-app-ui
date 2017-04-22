import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EditProfile from './../EditProfile';

test('renders heart', () => {
  const tree = renderer
    .create(<EditProfile loadScene={() => {}} user={{name: 'name', email: 'z4ls@live.com'}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
