/**
 * @flow
 */
export const ACTION_TYPES = {
  PROPERTY_REQUEST: 'PROPERTY_REQUEST',
  PROPERTY_SUCCESS: 'PROPERTY_SUCCESS',
  PROPERTY_FAILURE: 'PROPERTY_FAILURE',
  PROPERTY_FAVORITE_REQUEST: 'PROPERTY_FAVORITE_REQUEST',
  PROPERTY_FAVORITE_SUCCESS: 'PROPERTY_FAVORITE_SUCCESS',
  PROPERTY_FAVORITE_FAILURE: 'PROPERTY_FAVORITE_FAILURE',
  PROPERTY_FAVORITE_OPTIMISTIC_UPDATE: 'PROPERTY_FAVORITE_OPTIMISTIC_UPDATE',
  PROPERTY_MAPVIEW_CHANGE: 'PROPERTY_MAPVIEW_CHANGE',
  PROPERTY_SET_FILTERS_REQUEST: 'PROPERTY_SET_FILTERS_REQUEST',
  PROPERTY_ADD_ITEM_TO_HISTORY: 'PROPERTY_ADD_ITEM_TO_HISTORY',
  PROPERTY_REMOVE_ITEM_FROM_HISTORY: 'PROPERTY_REMOVE_ITEM_FROM_HISTORY',
  PROPERTY_TYPE_CHANGE: 'PROPERTY_TYPE_CHANGE',
  PROPERTY_INCREMENT_VIEW_COUNT: 'PROPERTY_INCREMENT_VIEW_COUNT',
  PROPERTY_SAVE_REQUEST: 'PROPERTY_SAVE_REQUEST',
  PROPERTY_SAVE_SUCCESS: 'PROPERTY_SAVE_SUCCESS',
  PROPERTY_SAVE_FAILURE: 'PROPERTY_SAVE_FAILURE',
  PROPERTY_EDIT_REQUEST: 'PROPERTY_EDIT_REQUEST',
  PROPERTY_DELETE_REQUEST: 'PROPERTY_DELETE_REQUEST',
  PROPERTY_DELETE_SUCCESS: 'PROPERTY_DELETE_SUCCESS',
  PROPERTY_DELETE_FAILURE: 'PROPERTY_DELETE_FAILURE',
  PROPERTY_RELATED_REQUEST: 'PROPERTY_RELATED_REQUEST',
  PROPERTY_RELATED_SUCCESS: 'PROPERTY_RELATED_SUCCESS',
  PROPERTY_RELATED_FAILURE: 'PROPERTY_RELATED_FAILURE',
  PROPERTY_SEARCH_REQUEST: 'PROPERTY_SEARCH_REQUEST',
  PROPERTY_SEARCH_SUCCESS: 'PROPERTY_SEARCH_SUCCESS',
  PROPERTY_SEARCH_FAILURE: 'PROPERTY_SEARCH_FAILURE',
  PROPERTY_REQUESTED_URL: 'PROPERTY_REQUESTED_URL',
  PROPERTY_RESET_NEXT_PAGE_URL: 'PROPERTY_RESET_NEXT_PAGE_URL',
  PROPERTY_RESET: 'PROPERTY_RESET',
  MY_PROPERTY_REQUEST: 'MY_PROPERTY_REQUEST',
  MY_PROPERTY_SUCCESS: 'MY_PROPERTY_SUCCESS',
  MY_PROPERTY_FAILURE: 'MY_PROPERTY_FAILURE',
  FAVORITES_SUCCESS: 'FAVORITES_SUCCESS',
  FAVORITES_REQUEST: 'FAVORITES_REQUEST',
  FAVORITES_FAILURE: 'FAVORITES_FAILURE',
  FILTER_RESET: 'FILTER_RESET',
  FILTER_UPDATE: 'FILTER_UPDATE',
  LISTING_RESET: 'LISTING_RESET',
  LISTING_UPDATE_ITEM: 'LISTING_UPDATE_ITEM',
  EDIT_LISTING_UPDATE_ITEM: 'EDIT_LISTING_UPDATE_ITEM',
  PROPERTY_ADD_ITEM_TO_HISTORY_REQUEST: 'PROPERTY_ADD_ITEM_TO_HISTORY_REQUEST',
};

function fetchProperties(params) {
  return {
    type: ACTION_TYPES.PROPERTY_REQUEST,
    params,
  };
}

function fetchMyProperties(params) {
  return {
    type: ACTION_TYPES.MY_PROPERTY_REQUEST,
    params,
  };
}

function fetchFavorites(params) {
  return {
    type: ACTION_TYPES.FAVORITES_REQUEST,
    params,
  };
}

function updateFilter({propertyType, field, value}) {
  return {
    type: ACTION_TYPES.FILTER_UPDATE,
    propertyType,
    field,
    value,
  };
}

function resetProperty() {
  return {
    type: ACTION_TYPES.PROPERTY_RESET,
  };
}
function resetPropertyNextPageURL() {
  return {
    type: ACTION_TYPES.PROPERTY_RESET_NEXT_PAGE_URL,
  };
}

function favoriteProperty(property) {
  return {
    type: ACTION_TYPES.PROPERTY_FAVORITE_REQUEST,
    params: {
      itemID: property._id,
      newItemAttributes: {
        isFavorited: !property.isFavorited,
      },
    },
  };
}

function changeListingValue(payload) {
  return {
    type: ACTION_TYPES.LISTING_UPDATE_ITEM,
    payload,
  };
}
function changeEditingListingValue(payload) {
  return {
    type: ACTION_TYPES.EDIT_LISTING_UPDATE_ITEM,
    payload,
  };
}

function resetFilter(): void {
  return {
    type: ACTION_TYPES.FILTER_RESET,
  };
}

function saveProperty(payload: object): void {
  return {
    type: ACTION_TYPES.PROPERTY_SAVE_REQUEST,
    payload: payload,
  };
}
function deleteProperty(property: object): void {
  return {
    type: ACTION_TYPES.PROPERTY_DELETE_REQUEST,
    params: {
      itemID: property._id,
    },
  };
}

function editProperty(property) {
  return {
    type: ACTION_TYPES.PROPERTY_EDIT_REQUEST,
    payload: property,
  };
}

function changeMapView() {
  return {
    type: ACTION_TYPES.PROPERTY_MAPVIEW_CHANGE,
  };
}
function changePropertyType(propertyType) {
  return {
    type: ACTION_TYPES.PROPERTY_TYPE_CHANGE,
    propertyType: propertyType,
  };
}

function setFilters({propertyType, filters}) {
  return {
    type: ACTION_TYPES.PROPERTY_SET_FILTERS_REQUEST,
    filters,
    propertyType,
  };
}

function removeFromHistory(payload: object): void {
  return {
    type: ACTION_TYPES.PROPERTY_REMOVE_ITEM_FROM_HISTORY,
    payload: payload,
  };
}
function incrementViews(propertyID: number): void {
  return {
    type: ACTION_TYPES.PROPERTY_INCREMENT_VIEW_COUNT,
    propertyID,
  };
}

export const ACTIONS = {
  fetchProperties,
  fetchMyProperties,
  resetProperty,
  favoriteProperty,
  fetchFavorites,
  changeListingValue,
  changeEditingListingValue,
  saveProperty,
  resetFilter,
  changeMapView,
  setFilters,
  changePropertyType,
  incrementViews,
  removeFromHistory,
  deleteProperty,
  editProperty,
  resetPropertyNextPageURL,
  updateFilter,
};
