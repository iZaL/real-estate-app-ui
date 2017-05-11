import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SettingListItem from '../SettingListItem';

test('renders heart', () => {
  const tree = renderer
    .create(
      <SettingListItem
        title="title"
        route="test"
        loadScene={() => {}}
        icon="battery"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
