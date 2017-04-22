import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SettingsScene from '../../scenes/SettingsScene';

test('Settings Scene', () => {
  const tree = renderer
    .create(
      <SettingsScene
        isAuthenticated={true}
        user={{name: 'zal', email: 'z4ls@live.com'}}
        country={{
          fullName: 'Kuwait',
          abbr: 'KW',
          currency: 'KD',
          coords: {
            latitude: 29.3759,
            longitude: 47.9774,
          },
        }}
        loadScene={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
