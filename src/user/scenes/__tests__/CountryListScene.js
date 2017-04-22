import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CountryListScene from '../../scenes/CountryListScene';

test('renders CountryListScene', () => {
  const tree = renderer
    .create(
      <CountryListScene
        country={{
          fullName: 'Kuwait',
          abbr: 'KW',
          currency: 'KD',
          coords: {
            latitude: 29.3759,
            longitude: 47.9774,
          },
        }}
        onCountrySelect={() => {}}
        countries={['Kuwait', 'Bahrain', 'Saudi Arabia']}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
