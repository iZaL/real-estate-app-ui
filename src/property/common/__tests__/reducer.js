import propertyReducer, {propertyOptionsReducer,propertyHistoryReducer} from '../../common/reducer';
import {ACTION_TYPES} from './../../common/actions';

import {
  filters,
  amenities,
  nearByPlaces,
  attributes,
  propertyTypes,
  genders,
  addMetas,
  searchMetas,
  sortOptions,
  categories,
  prices,
} from './../../common/reducerHelper';

const initialState = {
  isFetching: false,
  isFavoritesFetching: false,
  isRelatedFetching: false,
  isMyPropertiesFetching: false,
  isSaving: false,
  error: null,
  nextPageUrl: undefined,
  nextPageFavoritesUrl: undefined,
  mapView: false,
  showRelated: false,
  results: [],
  relatedResults: [],
  addListing: {
    stage: 1,
    attributes: {
      ...attributes,
    },
  },
  editListing: {
    stage: 1,
    attributes: {
      ...attributes,
    },
  },
};

const initialFiltersState = {
  propertyTypes,
  selectedPropertyType: propertyTypes[0],
  filters,
  amenities,
  nearByPlaces,
  genders,
  addMetas,
  searchMetas,
  sortOptions,
  categories,
  prices,
};

describe('Property Component Store', () => {
  let payload = {
    data: {
      next_page_url: null,
      data: [
        {
          _id: '589721ccf7415600dc786661',
          type: 'For Sale',
          category: 'Villa',
          meta: {
            bedroom: 1,
            bathroom: 1,
            kitchen: 1,
            parking: 1,
            area: 220.5,
            title: 'title',
            description: 'description',
            price: 200,
          },
          address: {
            state: '',
            city: '',
            latitude: 29.3667,
            longitude: 47.9667,
          },
          amenities: ['Swimming Pool'],
          updated_at: '2017-02-05 12:59:56',
          created_at: '2017-02-05 12:59:56',
          isFavorited: false,
          user: {
            _id: '5856b4e3f741562249268db1',
            name: 'Ideas Owners',
          },
        },
      ],
    },
  };

  test('property request', () => {
    expect(propertyReducer(initialState, {type: ACTION_TYPES.PROPERTY_REQUEST})).toEqual({
      ...initialState,
      isFetching: true,
      error: null,
    });
  });

  test('property success', () => {
    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.PROPERTY_SUCCESS,
        payload: payload.data,
      }),
    ).toEqual({
      ...initialState,
      results: ['589721ccf7415600dc786661'],
      nextPageUrl: null,
    });
  });

  test('property failure', () => {
    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.PROPERTY_FAILURE,
        error: 'error',
      }),
    ).toEqual({
      ...initialState,
      isFetching: false,
      error: 'error',
    });
  });

  test('property reset', () => {
    let state = {
      ...initialState,
      results: ['589721ccf7415600dc786661'],
      nextPageUrl: 'http://abc.com',
    };

    expect(propertyReducer(state, {type: ACTION_TYPES.PROPERTY_RESET})).toEqual({
      ...state,
      results: [],
      nextPageUrl: undefined,
    });
  });

  test('filter change', () => {
    let payload = {propertyType: 'For Sale', field: 'bedroom', value: '2'};
    expect(
      propertyOptionsReducer(initialFiltersState, {
        type: ACTION_TYPES.FILTER_UPDATE,
        propertyType: payload.propertyType,
        field: payload.field,
        value: payload.value,
      }),
    ).toEqual({
      ...initialFiltersState,
      filters: {
        ...initialFiltersState.filters,
        [payload.propertyType]: {
          ...initialFiltersState.filters[payload.propertyType],
          bedroom: '2',
        },
      },
    });
  });

  test('filter reset', () => {
    expect(propertyHistoryReducer(initialFiltersState, {type: ACTION_TYPES.FILTER_RESET})).toEqual({
      ...initialFiltersState,
    });
  });

  test('favorite success', () => {
    let payload = {
      data: {
        next_page_url: null,
        data: [
          {
            _id: '589721ccf7415600dc786661',
            type: 'For Sale',
          },
          {
            _id: '589721ccf7415600dc786662',
            type: 'For Rent',
          },
        ],
      },
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.FAVORITES_SUCCESS,
        payload: payload.data,
        nextPageFavoritesUrl: null,
      }),
    ).toEqual({
      ...initialState,
      results: ['589721ccf7415600dc786661', '589721ccf7415600dc786662'],
      nextPageFavoritesUrl: null,
    });
  });

  test('property failure', () => {
    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.FAVORITES_FAILURE,
        error: 'error',
      }),
    ).toEqual({
      ...initialState,
      isFetching: false,
      error: 'error',
    });
  });

  test('listing changes stage', () => {
    let payload = {
      stage: 5,
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload,
      }),
    ).toEqual({
      ...initialState,
      addListing: {
        ...initialState.addListing,
        stage: 5,
      },
    });
  });
  test('listing changes property infos ex:title,description,category', () => {
    let payload = {
      attributes: {
        title: 'New Property',
        category: 'Villa',
      },
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload,
      }),
    ).toEqual({
      ...initialState,
      addListing: {
        ...initialState.addListing,
        attributes: {
          ...initialState.addListing.attributes,
          title: 'New Property',
          category: 'Villa',
        },
      },
    });
  });

  test('listing changes property address', () => {
    let payload = {
      attributes: {
        address: {
          city: 'Salwa',
          country: 'Kuwait',
        },
      },
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload,
      }),
    ).toEqual({
      ...initialState,
      addListing: {
        ...initialState.addListing,
        attributes: {
          ...initialState.addListing.attributes,
          address: {
            ...initialState.addListing.attributes.address,
            city: 'Salwa',
            country: 'Kuwait',
          },
        },
      },
    });
  });

  test('listing changes property metas', () => {
    let payload = {
      attributes: {
        meta: {
          bedroom: '1',
          bathroom: '1',
        },
      },
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload,
      }),
    ).toEqual({
      ...initialState,
      addListing: {
        ...initialState.addListing,
        attributes: {
          ...initialState.addListing.attributes,
          meta: {
            ...initialState.addListing.attributes.meta,
            bedroom: '1',
            bathroom: '1',
          },
        },
      },
    });
  });

  test('listing adds images', () => {
    let payload = {
      replace: true,
      key: 'images',
      item: ['ABC.png', 'BCD.png', 'ABC.png'],
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload,
      }),
    ).toEqual({
      ...initialState,
      addListing: {
        ...initialState.addListing,
        attributes: {
          ...initialState.addListing.attributes,
          images: ['ABC.png', 'BCD.png'],
        },
      },
    });
  });

  test('listing removes image', () => {
    let payload = {
      replace: true,
      key: 'images',
      item: 'ABC.png',
    };

    let state = {
      ...initialState,
      addListing: {
        ...initialState.addListing,
        attributes: {
          ...initialState.addListing.attributes,
          images: ['ABC.png', 'BCD.png'],
        },
      },
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload,
      }),
    ).toEqual({
      ...initialState,
      addListing: {
        ...initialState.addListing,
        attributes: {
          ...initialState.addListing.attributes,
          images: ['BCD.png'],
        },
      },
    });

    // check mutation
    let oldState = state.addListing.attributes.images;
    expect(oldState).toEqual(['ABC.png', 'BCD.png']);
  });

  test('listing adds amenities', () => {
    let state = {
      ...initialState,
      addListing: {
        ...initialState.addListing,
        attributes: {
          ...initialState.addListing.attributes,
          amenities: ['Sauna'],
        },
      },
    };

    let payload = {
      replace: true,
      key: 'amenities',
      item: 'Swimming Pool',
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload,
      }),
    ).toEqual({
      ...state,
      addListing: {
        ...state.addListing,
        attributes: {
          ...state.addListing.attributes,
          amenities: ['Sauna', 'Swimming Pool'],
        },
      },
    });
  });

  test('listing removes amenities', () => {
    let state = {
      ...initialState,
      addListing: {
        ...initialState.addListing,
        attributes: {
          ...initialState.addListing.attributes,
          amenities: ['Sauna', 'Swimming Pool'],
        },
      },
    };

    let payload = {
      replace: true,
      key: 'amenities',
      item: 'Swimming Pool',
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload,
      }),
    ).toEqual({
      ...state,
      addListing: {
        ...state.addListing,
        attributes: {
          ...state.addListing.attributes,
          amenities: ['Sauna'],
        },
      },
    });
  });

  test('add item to search history', () => {
    let initialSearchHistory = [
      {
        'For Sale': {
          bathroom: 'Any',
          bedroom: 'Any',
          category: 'Any',
          country: 'Kuwait',
          parking: 'Any',
          priceFrom: 'Any',
          priceTo: 'Any',
          searchString: 'Jahra, Kuwait',
          sortBy: 'New',
        },
      },
    ];

    let payload = {
      'For Rent': {
        bathroom: 'Any',
        bedroom: 'Any',
        category: 'Any',
        country: 'Kuwait',
        parking: 'Any',
        priceFrom: 'Any',
        priceTo: 'Any',
        searchString: 'Fintas, Kuwait',
        sortBy: 'New',
      },
    };

    expect(
      propertyHistoryReducer(initialSearchHistory, {
        type: ACTION_TYPES.PROPERTY_ADD_ITEM_TO_HISTORY,
        payload: payload,
      }),
    ).toEqual([
      {
        'For Sale': {
          bathroom: 'Any',
          bedroom: 'Any',
          category: 'Any',
          country: 'Kuwait',
          parking: 'Any',
          priceFrom: 'Any',
          priceTo: 'Any',
          searchString: 'Jahra, Kuwait',
          sortBy: 'New',
        },
      },
      {
        'For Rent': {
          bathroom: 'Any',
          bedroom: 'Any',
          category: 'Any',
          country: 'Kuwait',
          parking: 'Any',
          priceFrom: 'Any',
          priceTo: 'Any',
          searchString: 'Fintas, Kuwait',
          sortBy: 'New',
        },
      },
    ]);
  });

  // test('updated new item when added to search history', () => {
  //   let initialSearchHistory = [
  //     {
  //       'For Sale': {
  //         bathroom: 'Any',
  //         bedroom: 'Any',
  //         category: 'Any',
  //         country: 'Kuwait',
  //         parking: 'Any',
  //         priceFrom: 'Any',
  //         priceTo: 'Any',
  //         searchString: 'Jahra, Kuwait',
  //         sortBy: 'New',
  //         total:0
  //       },
  //     },
  //     {
  //       'For Rent': {
  //         bathroom: 'Any',
  //         bedroom: 'Any',
  //         category: 'Any',
  //         country: 'Kuwait',
  //         parking: 'Any',
  //         priceFrom: 'Any',
  //         priceTo: 'Any',
  //         searchString: 'Fintas, Kuwait',
  //         sortBy: 'New',
  //         total:10
  //       },
  //     },
  //   ];
  //
  //   let payload = {
  //     'For Rent': {
  //       bathroom: 'Any',
  //       bedroom: 'Any',
  //       category: 'Any',
  //       country: 'Kuwait',
  //       parking: 'Any',
  //       priceFrom: 'Any',
  //       priceTo: 'Any',
  //       searchString: 'Fintas, Kuwait',
  //       sortBy: 'New',
  //       total:100
  //     },
  //   };
  //
  //   expect(
  //     historyReducer(initialSearchHistory, {
  //       type: ACTION_TYPES.PROPERTY_ADD_ITEM_TO_HISTORY,
  //       payload: payload,
  //     }),
  //   ).toEqual([
  //     {
  //       'For Sale': {
  //         bathroom: 'Any',
  //         bedroom: 'Any',
  //         category: 'Any',
  //         country: 'Kuwait',
  //         parking: 'Any',
  //         priceFrom: 'Any',
  //         priceTo: 'Any',
  //         searchString: 'Jahra, Kuwait',
  //         sortBy: 'New',
  //         total:0
  //       },
  //     },
  //     {
  //       'For Rent': {
  //         bathroom: 'Any',
  //         bedroom: 'Any',
  //         category: 'Any',
  //         country: 'Kuwait',
  //         parking: 'Any',
  //         priceFrom: 'Any',
  //         priceTo: 'Any',
  //         searchString: 'Fintas, Kuwait',
  //         sortBy: 'New',
  //         total:100,
  //       },
  //     },
  //   ]);
  // });

  test('removes item from search history', () => {
    let initialSearchHistory = [
      {
        'For Sale': {
          bathroom: 'Any',
          bedroom: 'Any',
          category: 'Any',
          country: 'Kuwait',
          parking: 'Any',
          priceFrom: 'Any',
          priceTo: 'Any',
          searchString: 'Jahra, Kuwait',
          sortBy: 'New',
        },
      },
      {
        'For Rent': {
          bathroom: 'Any',
          bedroom: 'Any',
          category: 'Any',
          country: 'Kuwait',
          parking: 'Any',
          priceFrom: 'Any',
          priceTo: 'Any',
          searchString: 'Fintas, Kuwait',
          sortBy: 'New',
        },
      },
    ];
    let payload = {
      'For Rent': {
        bathroom: 'Any',
        bedroom: 'Any',
        category: 'Any',
        country: 'Kuwait',
        parking: 'Any',
        priceFrom: 'Any',
        priceTo: 'Any',
        searchString: 'Fintas, Kuwait',
        sortBy: 'New',
      },
    };

    expect(
      propertyHistoryReducer(initialSearchHistory, {
        type: ACTION_TYPES.PROPERTY_REMOVE_ITEM_FROM_HISTORY,
        payload: payload,
      }),
    ).toEqual([
      {
        'For Sale': {
          bathroom: 'Any',
          bedroom: 'Any',
          category: 'Any',
          country: 'Kuwait',
          parking: 'Any',
          priceFrom: 'Any',
          priceTo: 'Any',
          searchString: 'Jahra, Kuwait',
          sortBy: 'New',
        },
      },
    ]);
  });

  test('sets filter', () => {
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
      ...initialFiltersState,
      filters: {
        'For Sale': {
          bathroom: 'Any',
          bedroom: 'Any',
          category: 'Any',
          country: 'Bahrain',
          parking: 'Any',
          priceFrom: 'Any',
          priceTo: 'Any',
          searchString: 'Muharraq',
          sortBy: 'New',
        },
        'For Rent': {
          bathroom: 'Any',
          bedroom: 'Any',
          category: 'Any',
          country: 'Kuwait',
          parking: 'Any',
          priceFrom: 'Any',
          priceTo: 'Any',
          searchString: 'Salmiya',
          sortBy: 'New',
        },
      },
    };

    expect(
      propertyOptionsReducer(state, {
        type: ACTION_TYPES.PROPERTY_SET_FILTERS_REQUEST,
        propertyType: 'For Sale',
        filters: searchFilter,
      }),
    ).toEqual({
      ...state,
      filters: {
        'For Sale': searchFilter,
        'For Rent': {
          bathroom: 'Any',
          bedroom: 'Any',
          category: 'Any',
          country: 'Kuwait',
          parking: 'Any',
          priceFrom: 'Any',
          priceTo: 'Any',
          searchString: 'Salmiya',
          sortBy: 'New',
        },
      },
    });
  });

  test('Edit Property', () => {

    let initialState = {
      ...initialState,
    };

    let payload = {
      _id: '123',
      type: 'For Sale',
      category: 'Villa',
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
        title: '3 bedrooms apartment in Jabriya',
        description: 'Beautiful new apartment from rent in Jabriya near McDonalds',
        price: '200',
      },
      images: ['http://placehold.it/350x150'],
      amenities: ['Swimming Pool'],
    };

    let state = {
      ...initialState,
      editListing: {},
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.EDIT_LISTING_UPDATE_ITEM,
        payload: payload,
      }),
    ).toEqual({
      ...state,
      editListing: payload,
    });
  });

  test('Delete Property', () => {
    let state = {
      ...initialState,
      results: ['12345', '123'],
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.PROPERTY_DELETE_REQUEST,
        params: {
          itemID: '123',
        },
      }),
    ).toEqual({
      ...state,
      results: ['12345'],
    });
  });

  test('Property Clears Add Listing on Save Success', () => {

    let saved_attributes = {
      type: 'For Sale',
      category: 'Chalet',
      address: {
        city: 'Kuwait City',
        state: 'Kuwait',
        country: 'Kuwait',
        latitude: 29.3667,
        longitude: 47.9667,
      },
      meta: {
        description: '',
        price: '',
        area: '',
        bedroom: 1,
        bathroom: 1,
        parking: 'N/A',
        gender: '',
        email: '',
        phone1: '',
        phone2: '',
      },
      images: [],
      amenities: [],
      nearByPlaces: [],
    };

    let state = {
      ...initialState,
      addListing:{
        stage:7,
        ...initialState.addListing,
        attributes:saved_attributes
      },
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.PROPERTY_SAVE_SUCCESS,
        payload: {
          itemID: '123',
        },
      }),
    ).toEqual({
      ...state,
      addListing:{
        ...state.addListing,
        stage:1,
        attributes:{
          ...attributes
        }
      }
    });
  });


  test('Property Clears Edit Listing on Update Success', () => {

    let saved_attributes = {
      type: 'For Sale',
      category: 'Chalet',
      address: {
        city: 'Kuwait City',
        state: 'Kuwait',
        country: 'Kuwait',
        latitude: 29.3667,
        longitude: 47.9667,
      },
      meta: {
        description: '',
        price: '',
        area: '',
        bedroom: 1,
        bathroom: 1,
        parking: 'N/A',
        gender: '',
        email: '',
        phone1: '',
        phone2: '',
      },
      images: [],
      amenities: [],
      nearByPlaces: [],
    };

    let state = {
      ...initialState,
      editListing:{
        stage:7,
        ...initialState.editListing,
        attributes:saved_attributes
      },
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.PROPERTY_SAVE_SUCCESS,
        payload: {
          itemID: '123',
        },
      }),
    ).toEqual({
      ...state,
      editListing:{
        ...state.editListing,
        stage:1,
        attributes:{
          ...attributes
        }
      }
    });
  });


  test('Property Edit Gets the Correct Value While Editing', () => {

    let saving_property = {
      _id:'123',
      type: 'For Sale',
      category: 'Chalet',
      address: {
        city: 'Kuwait City',
        state: 'Kuwait',
        country: 'Kuwait',
        latitude: 29.3667,
        longitude: 47.9667,
      },
      meta: {
        description: 'D',
        price: '200',
        area: 'A',
        bedroom: 1,
        bathroom: 1,
        parking: 'N/A',
        gender: '',
        email: 'z@a.com',
        phone1: '979788',
        phone2: '',
      },
      images: ['http://a.com'],
      amenities: ['swimming'],
      nearByPlaces: ['beach'],
    };

    let state = {
      ...initialState,
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.PROPERTY_EDIT_REQUEST,
        payload: saving_property,
      }),
    ).toEqual({
      ...state,
      editListing:{
        ...state.editListing,
        stage:1,
        attributes:saving_property
      }
    });
  })

});
