import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PropertyFilterScene from '../../../scenes/PropertyFilterScene';
import {
  searchMetas,
  prices,
  filters,
  sortOptions,
  propertyTypes,
} from './../../../common/reducerHelper';

test('renders FilterScene', () => {
  const tree = renderer
    .create(
      <PropertyFilterScene
        onPriceFromSelect={() => {}}
        onPriceToSelect={() => {}}
        onSearchPress={() => {}}
        onSortSelect={() => {}}
        onShowSearch={() => {}}
        onSearch={() => {}}
        onMapViewChange={() => {}}
        onTypeChange={() => {}}
        onNavigateBack={() => {}}
        onCountryChange={() => {}}
        onCategorySelect={() => {}}
        categories={['A', 'B']}
        country={{
          fullName: 'Kuwait',
          abbr: 'KW',
          currency: 'KD',
          coords: {
            latitude: 29.3759,
            longitude: 47.9774,
          },
        }}
        countries={['Kuwait', 'Bahrain']}
        propertyType="For Sale"
        mapView={false}
        searchMetas={searchMetas}
        prices={prices['For Sale']['KW']}
        filters={filters}
        sortOptions={sortOptions}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
