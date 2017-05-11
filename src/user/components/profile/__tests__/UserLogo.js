import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UserLogo from './../UserLogo';

test('renders heart', () => {
  const tree = renderer
    .create(<UserLogo user={{name: 'name', email: 'z4ls@live.com'}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
