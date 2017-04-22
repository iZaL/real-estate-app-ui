import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import List from './../List';

test('renders AddressPicker', () => {
  const tree = renderer
    .create(
      <List
        selected="test"
        onSelect={() => {}}
        ranges={['10-20']}
        title="test"
        field="type"
        updateListing={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
