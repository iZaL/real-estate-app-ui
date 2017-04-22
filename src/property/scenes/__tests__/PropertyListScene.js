import 'react-native';
import React from 'react';
import PropertyListScene from '../PropertyListScene';
import renderer from 'react-test-renderer';

const properties = [
  {
    _id: '589f2bd4f7415600d93be131',
    type: 'For Sale',
    category: 'Villa',
    meta: {
      title: '3 bedrooms apartment in Jabriya',
      description: 'Beautiful new apartment from rent in Jabriya near McDonalds',
      price: 200,
      bedroom: 2,
      bathroom: 1,
      kitchen: 1,
      parking: 1,
      area: 220.5,
    },
    address: {
      state: '',
      city: '',
      latitude: 29.348829953479,
      longitude: 48.059641335098,
    },
    amenities: ['Swimming Pool', 'Sauna'],
    updated_at: '2017-02-11 15:20:52',
    created_at: '2017-02-11 15:20:52',
    images: ['http://re.dev/uploads/fc462facaed429e87b3b99965e12d977.jpg'],
    isFavorited: false,
    user: {
      _id: '5856b4e3f741562249268db1',
      name: 'Ideas Owners',
      email: 'admin@test.com',
      active: true,
      isCompany: true,
      image: 'http://re.dev/uploads/fff08db3a156aa81134cac54d3c9ea3e.jpg',
      company: {
        A: 'a',
        address: 'Khalid bin walked street, sharp, sawaber 6',
        description: 'Software Company',
      },
    },
  },
];

test('renders PropertyList Component', () => {
  const tree = renderer
    .create(
      <PropertyListScene
        collection={properties}
        loadScene={() => {}}
        onImagePress={() => {}}
        handleFavoritePress={() => {}}
        country={{
          fullName: 'Kuwait',
          abbr: 'KW',
          currency: 'KD',
          coords: {
            latitude: 29.3759,
            longitude: 47.9774,
          },
        }}
        isFetching={false}
        refreshProperties={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
