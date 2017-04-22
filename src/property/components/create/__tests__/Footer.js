import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './../Footer';

test('renders Footer', () => {
  const tree = renderer.create(<Footer updateListing={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
