import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UserEditScene from '../UserEditScene';

test('renders heart', () => {
  const tree = renderer
    .create(
      <UserEditScene
        user={{name: 'zal', email: 'z4ls@live.com'}}
        pickImage={() => {}}
        onFieldChange={() => {}}
        uploaded={false}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
