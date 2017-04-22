import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ProfileScene from '../../scenes/ProfileScene';

test('renders Profile Scene', () => {
  const tree = renderer
    .create(
      <ProfileScene
        user={{
          name: 'name',
          email: 'z4ls@live.com',
          isCompany: true,
          company: {description: 'company description'},
        }}
        properties={[]}
        isFetching={false}
        loadScene={() => {}}
        handleFavoritePress={() => {}}
        fetchProperties={() => {}}
        country={{
          fullName: 'Kuwait',
          abbr: 'KW',
          currency: 'KD',
          coords: {
            latitude: 29.3759,
            longitude: 47.9774,
          },
        }}
        refreshProperties={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
