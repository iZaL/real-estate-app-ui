import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UserInfo from './../UserInfo';

test('renders User Info', () => {
  const tree = renderer
    .create(
      <UserInfo
        user={{
          name: 'name',
          email: 'z4ls@live.com',
          isCompany: true,
          company: {description: 'Company Description'},
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
