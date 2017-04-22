import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PropertyAmenities from './../PropertyAmenities';

test('renders PropertyAmenities', () => {
  const tree = renderer
    .create(
      <PropertyAmenities
        selected={['swimming pool']}
        updateListing={() => {}}
        collection={['Sauna', 'swimming pool']}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
