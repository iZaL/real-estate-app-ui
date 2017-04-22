import appReducer from '../reducer';
import propertyReducer from '../../../property/common/reducer';
import {ACTION_TYPES} from '../actions';
import {ACTION_TYPES as PROPERTY_ACTION_TYPES} from '../../../property/common/actions';

const initialState = {
  bootstrapped: false,
  booted: false,
  selectedCountry: 'Kuwait',
};

describe('App Component Store', () => {
  test('should return the initial state', () => {
    expect(appReducer(initialState, {type: 'UNDEFINED'})).toEqual(initialState);
  });

  test('app bootstraps', () => {
    expect(appReducer(initialState, {type: ACTION_TYPES.BOOT_SUCCESS})).toEqual({
      booted: true,
      bootstrapped: false,
      selectedCountry: 'Kuwait',
    });
  });

  test('should change country', () => {
    expect(
      appReducer(initialState, {
        type: ACTION_TYPES.COUNTRY_CHANGED,
        country: 'UAE',
      }),
    ).toEqual({
      booted: false,
      bootstrapped: false,
      selectedCountry: 'UAE',
    });
  });

  test('setting filter sets the country to filters country', () => {
    let searchFilter = {
      bathroom: 'Any',
      bedroom: 'Any',
      category: 'Any',
      country: 'Saudi',
      parking: 'Any',
      priceFrom: 'Any',
      priceTo: 'Any',
      searchString: 'Jeddah',
      sortBy: 'New',
    };

    let state = {
      ...initialState,
    };

    expect(
      appReducer(state, {
        type: PROPERTY_ACTION_TYPES.PROPERTY_SET_FILTERS_REQUEST,
        propertyType: 'For Sale',
        filters: searchFilter,
      }),
    ).toEqual({
      ...state,
      selectedCountry: 'Saudi',
    });
  });
});
