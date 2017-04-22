import {ACTIONS} from '../../common/actions';

describe('App Component Actions', () => {
  test('fetchProperties action', () => {
    expect(
      ACTIONS.fetchProperties({
        id: 1,
      }),
    ).toMatchSnapshot();
  });

  test('fetchFavorites action', () => {
    expect(
      ACTIONS.fetchFavorites({
        id: 1,
      }),
    ).toMatchSnapshot();
  });

  test('updateFilter action', () => {
    expect(ACTIONS.updateFilter('bedroom', 1)).toMatchSnapshot();
  });

  test('reset property action', () => {
    expect(ACTIONS.resetProperty()).toMatchSnapshot();
  });

  test('changeListingValue action', () => {
    expect(
      ACTIONS.changeListingValue('attributes', {
        title: 'property title',
        address: {
          city: 'Kuwait City',
          state: 'Kuwait City',
          country: 'Kuwait',
          latitude: 29.3667,
          longitude: 47.9667,
        },
        meta: {
          bedroom: 'Studio',
          bathroom: '1',
          kitchen: '1',
          area: '220.5',
          parking: '1',
        },
        images: [],
        tags: ['New', 'Duplex'],
        amenities: ['Swimming Pool'],
      }),
    ).toMatchSnapshot();
  });

  test('reset filter', () => {
    expect(ACTIONS.resetFilter()).toMatchSnapshot();
  });

  test('reset filter', () => {
    expect(ACTIONS.saveProperty()).toMatchSnapshot();
  });

  test('add to history', () => {
    expect(ACTIONS.setFilters({'For Sale': {country: 'Kuwait'}})).toMatchSnapshot();
  });

  test('remove from history', () => {
    expect(ACTIONS.removeFromHistory({'For Sale': {country: 'Kuwait'}})).toMatchSnapshot();
  });

  test('edit property', () => {
    expect(ACTIONS.editProperty({_id: '123', title: 'property'})).toMatchSnapshot();
  });

  test('delete property', () => {
    expect(ACTIONS.deleteProperty({_id: '123', title: 'property'})).toMatchSnapshot();
  });
});
