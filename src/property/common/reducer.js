import {ACTION_TYPES} from './actions';
import merge from 'lodash/merge';
import isArray from 'lodash/isArray';
import concat from 'lodash/concat';
import map from 'lodash/map';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';
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
} from './reducerHelper';

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

export default function propertyReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.PROPERTY_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        showRelated: false,
      };
    case ACTION_TYPES.PROPERTY_SUCCESS: {
      let results = [];
      const propertyCollections = action.payload.data;
      map(propertyCollections, entity => {
        results.push(entity._id);
      });
      return {
        ...state,
        isFetching: false,
        error: null,
        results: union(state.results, results),
        nextPageUrl: action.payload.next_page_url,
      };
    }
    case ACTION_TYPES.PROPERTY_FAILURE:
      return {...state, isFetching: false, error: action.error};

    case ACTION_TYPES.MY_PROPERTY_REQUEST:
      return {
        ...state,
        isMyPropertiesFetching: true,
        error: null,
      };
    case ACTION_TYPES.MY_PROPERTY_SUCCESS: {
      let myPropertyResults = [];
      let propertyCollections = action.payload.data;
      map(propertyCollections, entity => {
        myPropertyResults.push(entity._id);
      });
      return {
        ...state,
        isMyPropertiesFetching: false,
        error: null,
        results: union(state.results, myPropertyResults),
        myNextPageUrl: action.payload.next_page_url,
      };
    }
    case ACTION_TYPES.MY_PROPERTY_FAILURE:
      return {...state, isMyPropertiesFetching: false, error: action.error};

    case ACTION_TYPES.FAVORITES_REQUEST:
      return {
        ...state,
        isFavoritesFetching: true,
        error: null,
      };
    case ACTION_TYPES.FAVORITES_SUCCESS:
      const favoriteResults = [];
      const favoritePropertyCollections = action.payload.data;
      map(favoritePropertyCollections, entity => {
        favoriteResults.push(entity._id);
      });
      return {
        ...state,
        nextPageFavoritesUrl: action.payload.next_page_url,
        results: union(state.results, favoriteResults),
        isFavoritesFetching: false,
      };
    case ACTION_TYPES.FAVORITES_FAILURE:
      return {...state, isFavoritesFetching: false, error: action.error};

    case ACTION_TYPES.PROPERTY_RELATED_REQUEST:
      return {
        ...state,
        isRelatedFetching: true,
        error: null,
      };
    case ACTION_TYPES.PROPERTY_RELATED_SUCCESS:
      let results = [];
      const propertyCollections = action.payload.data;
      map(propertyCollections, entity => {
        results.push(entity._id);
      });
      return {
        ...state,
        isRelatedFetching: false,
        error: null,
        showRelated: true,
        relatedResults: union(state.relatedResults, results),
      };
    case ACTION_TYPES.PROPERTY_RELATED_FAILURE:
      return {
        ...state,
        isRelatedFetching: false,
        error: action.error,
      };

    case ACTION_TYPES.PROPERTY_SAVE_REQUEST:
      return {
        ...state,
        isSaving: true,
      };
    case ACTION_TYPES.PROPERTY_SAVE_SUCCESS:
      return {
        ...state,
        isSaving: false,
        addListing: {
          ...state.addListing,
          stage: 1,
          attributes: {
            ...initialState.addListing.attributes,
          },
        },
        editListing: {
          ...state.editListing,
          stage: 1,
          attributes: {
            ...initialState.editListing.attributes,
          },
        },
      };
    case ACTION_TYPES.PROPERTY_SAVE_FAILURE:
      return {
        ...state,
        isSaving: false,
      };

    case ACTION_TYPES.PROPERTY_RESET:
      return {
        ...state,
        results: [],
        nextPageUrl: undefined,
        showRelated: false,
      };
    case ACTION_TYPES.PROPERTY_RESET_NEXT_PAGE_URL:
      return {
        ...state,
        nextPageUrl: undefined,
      };
    case ACTION_TYPES.PROPERTY_MAPVIEW_CHANGE:
      return {
        ...state,
        mapView: !state.mapView,
      };

    case ACTION_TYPES.LISTING_RESET:
      return {
        ...state,
        addListing: {
          ...state.addListing,
        },
      };
    case ACTION_TYPES.LISTING_UPDATE_ITEM:
      if (action.payload.replace) {
        const {key, item} = action.payload;
        const oldState = state.addListing.attributes[key];
        let newState;

        if (isArray(item)) {
          newState = union(oldState, item);
        } else {
          if (oldState.includes(item)) {
            // remove item
            newState = oldState.filter(value => value !== item);
          } else {
            newState = union(oldState, [item]);
          }
        }
        return {
          ...state,
          addListing: {
            ...state.addListing,
            attributes: {
              ...state.addListing.attributes,
              [key]: newState,
            },
          },
        };
      }
      return {
        ...state,
        addListing: merge({}, state.addListing, action.payload),
      };

    case ACTION_TYPES.EDIT_LISTING_UPDATE_ITEM:
      if (action.payload.replace) {
        const {key, item} = action.payload;
        const oldState = state.editListing.attributes[key];
        let newState;

        if (isArray(item)) {
          newState = union(oldState, item);
        } else {
          if (oldState.includes(item)) {
            // remove item
            newState = oldState.filter(value => value !== item);
          } else {
            newState = union(oldState, [item]);
          }
        }
        return {
          ...state,
          editListing: {
            ...state.editListing,
            attributes: {
              ...state.editListing.attributes,
              [key]: newState,
            },
          },
        };
      }
      return {
        ...state,
        editListing: merge({}, state.editListing, action.payload),
      };

    case ACTION_TYPES.PROPERTY_EDIT_REQUEST:
      return {
        ...state,
        editListing: {
          ...state.editListing,
          attributes: action.payload,
        },
      };

    case ACTION_TYPES.PROPERTY_DELETE_REQUEST:
      return {
        ...state,
        results: state.results.filter(
          itemID => itemID !== action.params.itemID,
        ),
      };

    default:
      return state;
  }
}

export function propertyHistoryReducer(state = [], action = {}) {
  switch (action.type) {
    case ACTION_TYPES.PROPERTY_ADD_ITEM_TO_HISTORY:
      return concat(state, action.payload);
      break;
    case ACTION_TYPES.PROPERTY_REMOVE_ITEM_FROM_HISTORY:
      return state.filter(history => {
        return !isEqual(history, action.payload);
      });
    default:
      return state;
  }
}

let initialFilters = {
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

export function propertyOptionsReducer(state = initialFilters, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.PROPERTY_SET_FILTERS_REQUEST:
      return {
        ...state,
        selectedPropertyType: action.propertyType,
        filters: {
          ...state.filters,
          [action.propertyType]: {
            ...state.filters[action.propertyType],
            ...action.filters,
          },
        },
      };
      break;

    case ACTION_TYPES.PROPERTY_TYPE_CHANGE:
      return {
        ...state,
        selectedPropertyType: action.propertyType,
      };
    case ACTION_TYPES.FILTER_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.propertyType]: {
            ...state.filters[action.propertyType],
            [action.field]: action.value,
          },
        },
      };
    case ACTION_TYPES.FILTER_RESET:
      return {
        ...state,
        filters: state.filters,
      };
    default:
      return state;
  }
}
