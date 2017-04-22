import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AddressPicker from './../AddressPicker';
test('renders AddressPicker', () => {
  const tree = renderer
    .create(
      <AddressPicker
        country={{
          fullName: 'Kuwait',
          abbr: 'KW',
          currency: 'KD',
          coords: {
            latitude: 29.3759,
            longitude: 47.9774,
          },
        }}
        updateAddress={() => {}}
        updateListing={() => {}}
        address={{
          city: '',
          state: '',
          country: '',
          latitude: 0,
          longitude: 0,
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
