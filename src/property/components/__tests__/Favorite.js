import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Favorite from './../Favorite';

test('renders heart', () => {
  const tree = renderer.create(<Favorite isFavorited={true} handleFavoritePress={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
