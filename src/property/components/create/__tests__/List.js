import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import List from './../List';

test('renders List', () => {
  const tree = renderer
    .create(<List field="type" updateListing={() => {}} collection={['a']} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
